"""
Tests for CSR Tracker
"""

import pytest
from datetime import date

from csr_program.models import (
    CSRProgram,
    Activity,
    Volunteer,
    Donation,
    ProgramStatus,
    ActivityType,
)
from csr_program.tracker import CSRTracker


@pytest.fixture
def tracker():
    return CSRTracker()


@pytest.fixture
def sample_volunteer():
    return Volunteer(
        volunteer_id="V001",
        name="김철수",
        department="개발팀",
        email="kim@test.com",
    )


@pytest.fixture
def sample_activity():
    return Activity(
        activity_id="A001",
        name="테스트 활동",
        description="테스트 설명",
        category="environment",
        activity_type=ActivityType.VOLUNTEER,
        start_date=date(2024, 6, 1),
    )


@pytest.fixture
def sample_program():
    return CSRProgram(
        program_id="P001",
        name="테스트 프로그램",
        description="테스트 설명",
        category="environment",
        start_date=date(2024, 1, 1),
        status=ProgramStatus.ACTIVE,
    )


class TestVolunteerManagement:
    def test_register_volunteer(self, tracker, sample_volunteer):
        tracker.register_volunteer(sample_volunteer)
        assert tracker.get_volunteer("V001") is not None
        assert tracker.get_volunteer("V001").name == "김철수"

    def test_get_nonexistent_volunteer(self, tracker):
        assert tracker.get_volunteer("INVALID") is None


class TestActivityManagement:
    def test_add_activity(self, tracker, sample_activity):
        tracker.add_activity(sample_activity)
        assert tracker.get_activity("A001") is not None

    def test_add_activity_to_program(self, tracker, sample_activity, sample_program):
        tracker.add_program(sample_program)
        tracker.add_activity(sample_activity, program_id="P001")
        program = tracker.get_program("P001")
        assert len(program.activities) == 1

    def test_get_activities_by_category(self, tracker):
        activity1 = Activity(
            activity_id="A001",
            name="환경 활동",
            description="테스트",
            category="environment",
            activity_type=ActivityType.VOLUNTEER,
            start_date=date.today(),
        )
        activity2 = Activity(
            activity_id="A002",
            name="교육 활동",
            description="테스트",
            category="education",
            activity_type=ActivityType.EDUCATION,
            start_date=date.today(),
        )
        tracker.add_activity(activity1)
        tracker.add_activity(activity2)

        env_activities = tracker.get_activities_by_category("environment")
        assert len(env_activities) == 1
        assert env_activities[0].activity_id == "A001"


class TestDonationManagement:
    def test_record_donation(self, tracker):
        donation = Donation(
            donation_id="D001",
            donor_name="테스트 기업",
            donor_type="corporate",
            amount=1000000,
        )
        tracker.record_donation(donation)
        assert tracker.get_donation("D001") is not None

    def test_total_donations(self, tracker):
        donation1 = Donation(
            donation_id="D001",
            donor_name="기업1",
            donor_type="corporate",
            amount=1000000,
            currency="KRW",
        )
        donation2 = Donation(
            donation_id="D002",
            donor_name="기업2",
            donor_type="corporate",
            amount=2000000,
            currency="KRW",
        )
        tracker.record_donation(donation1)
        tracker.record_donation(donation2)

        assert tracker.get_total_donations("KRW") == 3000000


class TestVolunteerHours:
    def test_record_volunteer_hours(self, tracker, sample_volunteer, sample_activity):
        tracker.register_volunteer(sample_volunteer)
        tracker.add_activity(sample_activity)

        result = tracker.record_volunteer_hours("V001", "A001", 8)
        assert result is True

        volunteer = tracker.get_volunteer("V001")
        assert volunteer.total_hours == 8

        activity = tracker.get_activity("A001")
        assert "V001" in activity.participants

    def test_record_hours_invalid_volunteer(self, tracker, sample_activity):
        tracker.add_activity(sample_activity)
        result = tracker.record_volunteer_hours("INVALID", "A001", 8)
        assert result is False


class TestStatistics:
    def test_active_programs_count(self, tracker):
        program1 = CSRProgram(
            program_id="P001",
            name="활성 프로그램",
            description="테스트",
            category="environment",
            start_date=date.today(),
            status=ProgramStatus.ACTIVE,
        )
        program2 = CSRProgram(
            program_id="P002",
            name="완료 프로그램",
            description="테스트",
            category="education",
            start_date=date.today(),
            status=ProgramStatus.COMPLETED,
        )
        tracker.add_program(program1)
        tracker.add_program(program2)

        assert tracker.get_active_programs_count() == 1

    def test_top_volunteers(self, tracker):
        for i in range(5):
            volunteer = Volunteer(
                volunteer_id=f"V00{i}",
                name=f"봉사자{i}",
                department="테스트팀",
                email=f"v{i}@test.com",
            )
            volunteer.total_hours = (i + 1) * 10
            tracker.register_volunteer(volunteer)

        top = tracker.get_top_volunteers(3)
        assert len(top) == 3
        assert top[0].total_hours == 50
        assert top[1].total_hours == 40
        assert top[2].total_hours == 30
