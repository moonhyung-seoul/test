"""
Tests for CSR Program Models
"""

import pytest
from datetime import date

from csr_program.models import (
    CSRProgram,
    Activity,
    Volunteer,
    Donation,
    ImpactMetric,
    ProgramStatus,
    ActivityType,
)


class TestVolunteer:
    def test_create_volunteer(self):
        volunteer = Volunteer(
            volunteer_id="V001",
            name="김철수",
            department="개발팀",
            email="kim@test.com",
        )
        assert volunteer.volunteer_id == "V001"
        assert volunteer.name == "김철수"
        assert volunteer.total_hours == 0.0

    def test_add_hours(self):
        volunteer = Volunteer(
            volunteer_id="V001",
            name="김철수",
            department="개발팀",
            email="kim@test.com",
        )
        volunteer.add_hours(8)
        assert volunteer.total_hours == 8.0
        assert volunteer.activities_count == 1

        volunteer.add_hours(4)
        assert volunteer.total_hours == 12.0
        assert volunteer.activities_count == 2


class TestDonation:
    def test_create_donation(self):
        donation = Donation(
            donation_id="D001",
            donor_name="테스트 기업",
            donor_type="corporate",
            amount=1000000,
        )
        assert donation.donation_id == "D001"
        assert donation.amount == 1000000

    def test_formatted_amount_krw(self):
        donation = Donation(
            donation_id="D001",
            donor_name="테스트",
            donor_type="individual",
            amount=1500000,
            currency="KRW",
        )
        assert donation.get_formatted_amount() == "₩1,500,000"

    def test_formatted_amount_usd(self):
        donation = Donation(
            donation_id="D002",
            donor_name="테스트",
            donor_type="individual",
            amount=1000.50,
            currency="USD",
        )
        assert donation.get_formatted_amount() == "$1,000.50"


class TestImpactMetric:
    def test_achievement_rate(self):
        metric = ImpactMetric(
            metric_id="M001",
            name="테스트 지표",
            description="테스트",
            value=80,
            unit="개",
            target_value=100,
        )
        assert metric.get_achievement_rate() == 80.0

    def test_achievement_rate_no_target(self):
        metric = ImpactMetric(
            metric_id="M001",
            name="테스트 지표",
            description="테스트",
            value=80,
            unit="개",
        )
        assert metric.get_achievement_rate() is None


class TestActivity:
    def test_add_participant(self):
        activity = Activity(
            activity_id="A001",
            name="테스트 활동",
            description="테스트",
            category="environment",
            activity_type=ActivityType.VOLUNTEER,
            start_date=date.today(),
            max_participants=2,
        )
        assert activity.add_participant("V001") is True
        assert activity.add_participant("V002") is True
        assert activity.add_participant("V003") is False  # max reached
        assert activity.get_participant_count() == 2

    def test_no_duplicate_participants(self):
        activity = Activity(
            activity_id="A001",
            name="테스트 활동",
            description="테스트",
            category="environment",
            activity_type=ActivityType.VOLUNTEER,
            start_date=date.today(),
        )
        assert activity.add_participant("V001") is True
        assert activity.add_participant("V001") is False
        assert activity.get_participant_count() == 1


class TestCSRProgram:
    def test_create_program(self):
        program = CSRProgram(
            program_id="P001",
            name="테스트 프로그램",
            description="테스트 설명",
            category="environment",
            start_date=date.today(),
            budget=10000000,
        )
        assert program.program_id == "P001"
        assert program.status == ProgramStatus.PLANNED

    def test_total_volunteer_hours(self):
        program = CSRProgram(
            program_id="P001",
            name="테스트",
            description="테스트",
            category="environment",
            start_date=date.today(),
        )
        activity1 = Activity(
            activity_id="A001",
            name="활동1",
            description="테스트",
            category="environment",
            activity_type=ActivityType.VOLUNTEER,
            start_date=date.today(),
            volunteer_hours=10,
        )
        activity2 = Activity(
            activity_id="A002",
            name="활동2",
            description="테스트",
            category="environment",
            activity_type=ActivityType.VOLUNTEER,
            start_date=date.today(),
            volunteer_hours=20,
        )
        program.add_activity(activity1)
        program.add_activity(activity2)

        assert program.get_total_volunteer_hours() == 30

    def test_beneficiary_achievement_rate(self):
        program = CSRProgram(
            program_id="P001",
            name="테스트",
            description="테스트",
            category="environment",
            start_date=date.today(),
            target_beneficiaries=100,
            actual_beneficiaries=75,
        )
        assert program.get_beneficiary_achievement_rate() == 75.0
