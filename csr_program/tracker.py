"""
CSR Activity Tracker
사회공헌 활동 추적 시스템
"""

from datetime import date, datetime
from typing import Optional
from collections import defaultdict

from .models import (
    CSRProgram,
    Activity,
    Volunteer,
    Donation,
    ImpactMetric,
    ProgramStatus,
    ActivityType,
)
from .categories import CSRCategory


class CSRTracker:
    """사회공헌 활동 추적 및 관리"""

    def __init__(self):
        self.programs: dict[str, CSRProgram] = {}
        self.volunteers: dict[str, Volunteer] = {}
        self.activities: dict[str, Activity] = {}
        self.donations: dict[str, Donation] = {}

    # 프로그램 관리
    def add_program(self, program: CSRProgram) -> None:
        """프로그램 등록"""
        self.programs[program.program_id] = program

    def get_program(self, program_id: str) -> Optional[CSRProgram]:
        """프로그램 조회"""
        return self.programs.get(program_id)

    def update_program_status(self, program_id: str, status: ProgramStatus) -> bool:
        """프로그램 상태 업데이트"""
        program = self.programs.get(program_id)
        if program:
            program.status = status
            program.updated_at = datetime.now()
            return True
        return False

    # 봉사자 관리
    def register_volunteer(self, volunteer: Volunteer) -> None:
        """봉사자 등록"""
        self.volunteers[volunteer.volunteer_id] = volunteer

    def get_volunteer(self, volunteer_id: str) -> Optional[Volunteer]:
        """봉사자 조회"""
        return self.volunteers.get(volunteer_id)

    def record_volunteer_hours(
        self,
        volunteer_id: str,
        activity_id: str,
        hours: float
    ) -> bool:
        """봉사 시간 기록"""
        volunteer = self.volunteers.get(volunteer_id)
        activity = self.activities.get(activity_id)

        if volunteer and activity:
            volunteer.add_hours(hours)
            activity.volunteer_hours += hours
            activity.add_participant(volunteer_id)
            return True
        return False

    # 활동 관리
    def add_activity(
        self,
        activity: Activity,
        program_id: Optional[str] = None
    ) -> None:
        """활동 등록"""
        self.activities[activity.activity_id] = activity
        if program_id:
            program = self.programs.get(program_id)
            if program:
                program.add_activity(activity)

    def get_activity(self, activity_id: str) -> Optional[Activity]:
        """활동 조회"""
        return self.activities.get(activity_id)

    def get_activities_by_category(self, category: str) -> list[Activity]:
        """카테고리별 활동 조회"""
        return [
            activity for activity in self.activities.values()
            if activity.category == category
        ]

    def get_activities_by_date_range(
        self,
        start_date: date,
        end_date: date
    ) -> list[Activity]:
        """기간별 활동 조회"""
        return [
            activity for activity in self.activities.values()
            if start_date <= activity.start_date <= end_date
        ]

    # 기부 관리
    def record_donation(
        self,
        donation: Donation,
        program_id: Optional[str] = None
    ) -> None:
        """기부 기록"""
        self.donations[donation.donation_id] = donation
        if program_id:
            program = self.programs.get(program_id)
            if program:
                program.add_donation(donation)

    def get_donation(self, donation_id: str) -> Optional[Donation]:
        """기부 조회"""
        return self.donations.get(donation_id)

    # 통계 및 분석
    def get_total_volunteer_hours(self) -> float:
        """전체 봉사 시간 합계"""
        return sum(v.total_hours for v in self.volunteers.values())

    def get_total_donations(self, currency: str = "KRW") -> float:
        """전체 기부금액 합계"""
        return sum(
            d.amount for d in self.donations.values()
            if d.currency == currency
        )

    def get_total_participants(self) -> int:
        """전체 참여 인원"""
        return len(self.volunteers)

    def get_active_programs_count(self) -> int:
        """진행중인 프로그램 수"""
        return sum(
            1 for p in self.programs.values()
            if p.status == ProgramStatus.ACTIVE
        )

    def get_stats_by_category(self) -> dict:
        """카테고리별 통계"""
        stats = defaultdict(lambda: {
            "programs": 0,
            "activities": 0,
            "volunteer_hours": 0.0,
            "donations": 0.0,
            "participants": 0,
        })

        for program in self.programs.values():
            cat = program.category
            stats[cat]["programs"] += 1
            stats[cat]["activities"] += len(program.activities)
            stats[cat]["volunteer_hours"] += program.get_total_volunteer_hours()
            stats[cat]["donations"] += program.get_total_donations()
            stats[cat]["participants"] += program.get_total_participants()

        return dict(stats)

    def get_yearly_summary(self, year: int) -> dict:
        """연간 요약 통계"""
        start_date = date(year, 1, 1)
        end_date = date(year, 12, 31)

        yearly_activities = self.get_activities_by_date_range(start_date, end_date)
        yearly_donations = [
            d for d in self.donations.values()
            if start_date <= d.donation_date <= end_date
        ]

        return {
            "year": year,
            "total_activities": len(yearly_activities),
            "total_volunteer_hours": sum(a.volunteer_hours for a in yearly_activities),
            "total_donations": sum(d.amount for d in yearly_donations),
            "total_participants": len(set(
                p for a in yearly_activities for p in a.participants
            )),
            "activities_by_type": self._count_by_type(yearly_activities),
        }

    def _count_by_type(self, activities: list[Activity]) -> dict:
        """활동 유형별 개수"""
        counts = defaultdict(int)
        for activity in activities:
            counts[activity.activity_type.value] += 1
        return dict(counts)

    def get_top_volunteers(self, limit: int = 10) -> list[Volunteer]:
        """봉사 시간 상위 봉사자"""
        return sorted(
            self.volunteers.values(),
            key=lambda v: v.total_hours,
            reverse=True
        )[:limit]

    def get_impact_summary(self) -> dict:
        """사회적 영향 요약"""
        all_metrics: list[ImpactMetric] = []
        for program in self.programs.values():
            all_metrics.extend(program.impact_metrics)
            for activity in program.activities:
                all_metrics.extend(activity.impact_metrics)

        summary = {}
        for metric in all_metrics:
            if metric.name not in summary:
                summary[metric.name] = {
                    "total_value": 0,
                    "unit": metric.unit,
                    "count": 0,
                }
            summary[metric.name]["total_value"] += metric.value
            summary[metric.name]["count"] += 1

        return summary
