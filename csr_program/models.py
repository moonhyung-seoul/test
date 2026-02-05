"""
CSR Program Data Models
사회공헌 프로그램 데이터 모델
"""

from dataclasses import dataclass, field
from datetime import datetime, date
from typing import Optional
from enum import Enum


class ProgramStatus(Enum):
    """프로그램 상태"""
    PLANNED = "planned"          # 계획됨
    ACTIVE = "active"            # 진행중
    COMPLETED = "completed"      # 완료
    SUSPENDED = "suspended"      # 일시중단


class ActivityType(Enum):
    """활동 유형"""
    VOLUNTEER = "volunteer"      # 봉사활동
    DONATION = "donation"        # 기부
    SPONSORSHIP = "sponsorship"  # 후원
    EDUCATION = "education"      # 교육
    EVENT = "event"              # 행사


@dataclass
class Volunteer:
    """봉사자 정보"""
    volunteer_id: str
    name: str
    department: str
    email: str
    phone: Optional[str] = None
    total_hours: float = 0.0
    activities_count: int = 0
    joined_date: date = field(default_factory=date.today)

    def add_hours(self, hours: float) -> None:
        """봉사 시간 추가"""
        self.total_hours += hours
        self.activities_count += 1


@dataclass
class Donation:
    """기부 정보"""
    donation_id: str
    donor_name: str
    donor_type: str  # individual, corporate, department
    amount: float
    currency: str = "KRW"
    donation_date: date = field(default_factory=date.today)
    recipient: str = ""
    purpose: str = ""
    is_recurring: bool = False
    tax_deductible: bool = True

    def get_formatted_amount(self) -> str:
        """형식화된 금액 반환"""
        if self.currency == "KRW":
            return f"₩{self.amount:,.0f}"
        elif self.currency == "USD":
            return f"${self.amount:,.2f}"
        return f"{self.amount:,.2f} {self.currency}"


@dataclass
class ImpactMetric:
    """사회적 영향 측정 지표"""
    metric_id: str
    name: str
    description: str
    value: float
    unit: str
    target_value: Optional[float] = None
    measured_date: date = field(default_factory=date.today)

    def get_achievement_rate(self) -> Optional[float]:
        """목표 대비 달성률 계산"""
        if self.target_value and self.target_value > 0:
            return (self.value / self.target_value) * 100
        return None


@dataclass
class Activity:
    """사회공헌 활동"""
    activity_id: str
    name: str
    description: str
    category: str
    activity_type: ActivityType
    start_date: date
    end_date: Optional[date] = None
    location: str = ""
    max_participants: Optional[int] = None
    participants: list[str] = field(default_factory=list)
    volunteer_hours: float = 0.0
    budget: float = 0.0
    actual_cost: float = 0.0
    impact_metrics: list[ImpactMetric] = field(default_factory=list)
    status: ProgramStatus = ProgramStatus.PLANNED

    def add_participant(self, volunteer_id: str) -> bool:
        """참가자 추가"""
        if self.max_participants and len(self.participants) >= self.max_participants:
            return False
        if volunteer_id not in self.participants:
            self.participants.append(volunteer_id)
            return True
        return False

    def get_participant_count(self) -> int:
        """참가자 수 반환"""
        return len(self.participants)


@dataclass
class CSRProgram:
    """사회공헌 프로그램"""
    program_id: str
    name: str
    description: str
    category: str
    start_date: date
    end_date: Optional[date] = None
    budget: float = 0.0
    target_beneficiaries: int = 0
    actual_beneficiaries: int = 0
    activities: list[Activity] = field(default_factory=list)
    donations: list[Donation] = field(default_factory=list)
    impact_metrics: list[ImpactMetric] = field(default_factory=list)
    status: ProgramStatus = ProgramStatus.PLANNED
    responsible_department: str = ""
    partner_organizations: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)

    def add_activity(self, activity: Activity) -> None:
        """활동 추가"""
        self.activities.append(activity)
        self.updated_at = datetime.now()

    def add_donation(self, donation: Donation) -> None:
        """기부 추가"""
        self.donations.append(donation)
        self.updated_at = datetime.now()

    def get_total_volunteer_hours(self) -> float:
        """총 봉사 시간 계산"""
        return sum(activity.volunteer_hours for activity in self.activities)

    def get_total_donations(self) -> float:
        """총 기부금액 계산"""
        return sum(donation.amount for donation in self.donations)

    def get_total_participants(self) -> int:
        """총 참가자 수 계산"""
        all_participants = set()
        for activity in self.activities:
            all_participants.update(activity.participants)
        return len(all_participants)

    def get_beneficiary_achievement_rate(self) -> Optional[float]:
        """수혜자 목표 달성률"""
        if self.target_beneficiaries > 0:
            return (self.actual_beneficiaries / self.target_beneficiaries) * 100
        return None
