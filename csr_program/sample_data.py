"""
Sample Data for CSR Program
샘플 데이터
"""

from datetime import date

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
from .tracker import CSRTracker


def create_sample_tracker() -> CSRTracker:
    """샘플 데이터가 포함된 트래커 생성"""
    tracker = CSRTracker()

    # 봉사자 등록
    volunteers = [
        Volunteer(
            volunteer_id="V001",
            name="김철수",
            department="개발팀",
            email="kim@company.com",
            phone="010-1234-5678",
        ),
        Volunteer(
            volunteer_id="V002",
            name="이영희",
            department="마케팅팀",
            email="lee@company.com",
            phone="010-2345-6789",
        ),
        Volunteer(
            volunteer_id="V003",
            name="박민수",
            department="인사팀",
            email="park@company.com",
            phone="010-3456-7890",
        ),
        Volunteer(
            volunteer_id="V004",
            name="정지원",
            department="재무팀",
            email="jung@company.com",
        ),
        Volunteer(
            volunteer_id="V005",
            name="최현우",
            department="개발팀",
            email="choi@company.com",
        ),
    ]

    for volunteer in volunteers:
        tracker.register_volunteer(volunteer)

    # 환경보호 프로그램
    env_program = CSRProgram(
        program_id="P001",
        name="그린 캠퍼스 프로젝트",
        description="탄소 중립을 위한 친환경 캠퍼스 조성 프로젝트",
        category=CSRCategory.ENVIRONMENT.value,
        start_date=date(2024, 1, 1),
        end_date=date(2024, 12, 31),
        budget=50000000,
        target_beneficiaries=1000,
        actual_beneficiaries=850,
        status=ProgramStatus.ACTIVE,
        responsible_department="ESG팀",
        partner_organizations=["환경부", "녹색연합"],
    )

    # 환경 활동
    env_activity1 = Activity(
        activity_id="A001",
        name="해변 정화 활동",
        description="부산 해운대 해변 정화 봉사활동",
        category=CSRCategory.ENVIRONMENT.value,
        activity_type=ActivityType.VOLUNTEER,
        start_date=date(2024, 4, 22),
        end_date=date(2024, 4, 22),
        location="부산 해운대",
        max_participants=50,
        volunteer_hours=200,
        budget=2000000,
        actual_cost=1800000,
        status=ProgramStatus.COMPLETED,
    )
    env_activity1.participants = ["V001", "V002", "V003"]
    env_activity1.impact_metrics = [
        ImpactMetric(
            metric_id="M001",
            name="수거된 쓰레기",
            description="정화 활동으로 수거된 쓰레기 양",
            value=500,
            unit="kg",
            target_value=400,
        )
    ]

    env_activity2 = Activity(
        activity_id="A002",
        name="나무 심기 캠페인",
        description="회사 주변 공원 나무 심기",
        category=CSRCategory.ENVIRONMENT.value,
        activity_type=ActivityType.VOLUNTEER,
        start_date=date(2024, 4, 5),
        end_date=date(2024, 4, 5),
        location="서울 여의도 공원",
        max_participants=30,
        volunteer_hours=120,
        budget=5000000,
        actual_cost=4500000,
        status=ProgramStatus.COMPLETED,
    )
    env_activity2.participants = ["V001", "V004", "V005"]
    env_activity2.impact_metrics = [
        ImpactMetric(
            metric_id="M002",
            name="심은 나무",
            description="심은 나무 수",
            value=100,
            unit="그루",
            target_value=80,
        )
    ]

    env_program.activities = [env_activity1, env_activity2]
    tracker.add_program(env_program)
    tracker.add_activity(env_activity1)
    tracker.add_activity(env_activity2)

    # 교육 지원 프로그램
    edu_program = CSRProgram(
        program_id="P002",
        name="IT 꿈나무 육성",
        description="소외계층 청소년 대상 IT 교육 프로그램",
        category=CSRCategory.EDUCATION.value,
        start_date=date(2024, 3, 1),
        end_date=date(2024, 11, 30),
        budget=100000000,
        target_beneficiaries=200,
        actual_beneficiaries=180,
        status=ProgramStatus.ACTIVE,
        responsible_department="사회공헌팀",
        partner_organizations=["교육부", "지역아동센터연합"],
    )

    edu_activity = Activity(
        activity_id="A003",
        name="코딩 교실",
        description="초등학생 대상 기초 코딩 교육",
        category=CSRCategory.EDUCATION.value,
        activity_type=ActivityType.EDUCATION,
        start_date=date(2024, 3, 15),
        end_date=date(2024, 6, 15),
        location="서울 강남 지역아동센터",
        max_participants=20,
        volunteer_hours=480,
        budget=10000000,
        actual_cost=9500000,
        status=ProgramStatus.COMPLETED,
    )
    edu_activity.participants = ["V001", "V005"]
    edu_activity.impact_metrics = [
        ImpactMetric(
            metric_id="M003",
            name="교육 이수자",
            description="프로그램을 이수한 학생 수",
            value=18,
            unit="명",
            target_value=20,
        )
    ]

    edu_program.activities = [edu_activity]
    tracker.add_program(edu_program)
    tracker.add_activity(edu_activity)

    # 기부 기록
    donations = [
        Donation(
            donation_id="D001",
            donor_name="(주)테크컴퍼니",
            donor_type="corporate",
            amount=50000000,
            currency="KRW",
            donation_date=date(2024, 1, 15),
            recipient="환경재단",
            purpose="환경보호 기금",
        ),
        Donation(
            donation_id="D002",
            donor_name="임직원 일동",
            donor_type="department",
            amount=10000000,
            currency="KRW",
            donation_date=date(2024, 3, 1),
            recipient="장학재단",
            purpose="장학금 기금",
            is_recurring=True,
        ),
        Donation(
            donation_id="D003",
            donor_name="김철수",
            donor_type="individual",
            amount=500000,
            currency="KRW",
            donation_date=date(2024, 4, 1),
            recipient="적십자사",
            purpose="재난구호 기금",
        ),
    ]

    for donation in donations:
        tracker.record_donation(donation)

    env_program.donations = [donations[0]]
    edu_program.donations = [donations[1]]

    # 봉사 시간 기록
    tracker.record_volunteer_hours("V001", "A001", 8)
    tracker.record_volunteer_hours("V002", "A001", 8)
    tracker.record_volunteer_hours("V003", "A001", 8)
    tracker.record_volunteer_hours("V001", "A002", 4)
    tracker.record_volunteer_hours("V004", "A002", 4)
    tracker.record_volunteer_hours("V005", "A002", 4)
    tracker.record_volunteer_hours("V001", "A003", 48)
    tracker.record_volunteer_hours("V005", "A003", 48)

    return tracker


def print_sample_report():
    """샘플 보고서 출력"""
    from .reports import CSRReportGenerator

    tracker = create_sample_tracker()
    report_gen = CSRReportGenerator(tracker)

    # 요약 보고서 생성
    summary = report_gen.generate_summary_report()
    text_report = report_gen.format_text_report(summary)
    print(text_report)

    print("\n[카테고리별 통계]")
    for category, stats in summary["by_category"].items():
        print(f"  {category}:")
        print(f"    - 프로그램: {stats['programs']}개")
        print(f"    - 봉사시간: {stats['volunteer_hours']:.1f}시간")
        print(f"    - 기부금: ₩{stats['donations']:,.0f}")

    print("\n[상위 봉사자]")
    for v in tracker.get_top_volunteers(5):
        print(f"  - {v.name} ({v.department}): {v.total_hours}시간")


if __name__ == "__main__":
    print_sample_report()
