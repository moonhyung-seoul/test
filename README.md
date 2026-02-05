# CSR Program (기업 사회공헌 프로그램)

Corporate Social Responsibility Program Management System

기업의 사회공헌 활동을 체계적으로 관리하고 추적하기 위한 시스템입니다.

## Features (주요 기능)

### 1. Program Management (프로그램 관리)
- CSR 프로그램 등록 및 관리
- 프로그램 상태 추적 (계획/진행중/완료/일시중단)
- 예산 및 수혜자 관리

### 2. Activity Tracking (활동 추적)
- 봉사활동, 기부, 후원, 교육, 행사 등 다양한 활동 유형 지원
- 참가자 관리 및 봉사 시간 기록
- 활동별 비용 및 예산 추적

### 3. Volunteer Management (봉사자 관리)
- 봉사자 등록 및 프로필 관리
- 봉사 시간 누적 및 활동 이력
- 상위 봉사자 조회

### 4. Donation Tracking (기부 관리)
- 개인/기업/부서별 기부 기록
- 다중 통화 지원 (KRW, USD 등)
- 정기 기부 및 세제 혜택 표시

### 5. Impact Measurement (영향력 측정)
- 사회적 영향 지표 정의 및 추적
- 목표 대비 달성률 계산
- UN SDGs 연계

### 6. Reporting (보고서)
- 전체 요약 보고서
- 연간 보고서
- 프로그램별/카테고리별 보고서
- 봉사자별 활동 보고서
- JSON 및 텍스트 형식 출력

## CSR Categories (사회공헌 카테고리)

| Category | 한국어 | UN SDGs |
|----------|--------|---------|
| Environment | 환경보호 | 6, 7, 12, 13, 14, 15 |
| Education | 교육 지원 | 4 |
| Community | 지역사회 발전 | 11, 17 |
| Health | 보건/의료 | 3 |
| Culture | 문화/예술 | 4, 11 |
| Disaster Relief | 재난구호 | 1, 11, 13 |
| Welfare | 취약계층 지원 | 1, 2, 10 |
| Global | 글로벌 사회공헌 | 1, 2, 3, 4, 6, 17 |
| Social Enterprise | 사회적 기업 지원 | 8, 9, 12 |
| Ethics | 윤리경영 | 8, 16 |

## Installation (설치)

```bash
pip install -e .
```

## Quick Start (빠른 시작)

```python
from datetime import date
from csr_program import (
    CSRProgram,
    Activity,
    Volunteer,
    Donation,
    CSRCategory,
    CSRTracker,
    CSRReportGenerator,
)
from csr_program.models import ProgramStatus, ActivityType

# 트래커 초기화
tracker = CSRTracker()

# 봉사자 등록
volunteer = Volunteer(
    volunteer_id="V001",
    name="김철수",
    department="개발팀",
    email="kim@company.com",
)
tracker.register_volunteer(volunteer)

# 프로그램 생성
program = CSRProgram(
    program_id="P001",
    name="환경보호 캠페인",
    description="탄소 중립을 위한 환경보호 활동",
    category=CSRCategory.ENVIRONMENT.value,
    start_date=date(2024, 1, 1),
    budget=10000000,
    status=ProgramStatus.ACTIVE,
)
tracker.add_program(program)

# 활동 생성
activity = Activity(
    activity_id="A001",
    name="해변 정화 활동",
    description="부산 해운대 해변 정화",
    category=CSRCategory.ENVIRONMENT.value,
    activity_type=ActivityType.VOLUNTEER,
    start_date=date(2024, 4, 22),
    location="부산 해운대",
)
tracker.add_activity(activity, program_id="P001")

# 봉사 시간 기록
tracker.record_volunteer_hours("V001", "A001", hours=8)

# 기부 기록
donation = Donation(
    donation_id="D001",
    donor_name="(주)테크컴퍼니",
    donor_type="corporate",
    amount=5000000,
    currency="KRW",
    recipient="환경재단",
    purpose="환경보호 기금",
)
tracker.record_donation(donation, program_id="P001")

# 보고서 생성
report_gen = CSRReportGenerator(tracker)
summary = report_gen.generate_summary_report()
print(report_gen.format_text_report(summary))
```

## Sample Data (샘플 데이터)

샘플 데이터로 시스템을 테스트할 수 있습니다:

```python
from csr_program.sample_data import create_sample_tracker, print_sample_report

# 샘플 트래커 생성
tracker = create_sample_tracker()

# 샘플 보고서 출력
print_sample_report()
```

## Running Tests (테스트 실행)

```bash
pytest tests/ -v
```

## Project Structure (프로젝트 구조)

```
csr_program/
├── __init__.py         # 패키지 초기화
├── models.py           # 데이터 모델 (Program, Activity, Volunteer, etc.)
├── categories.py       # CSR 카테고리 정의
├── tracker.py          # 활동 추적 및 통계
├── reports.py          # 보고서 생성
└── sample_data.py      # 샘플 데이터

tests/
├── __init__.py
├── test_models.py      # 모델 테스트
└── test_tracker.py     # 트래커 테스트
```

## License

MIT License
