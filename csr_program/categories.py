"""
CSR Activity Categories
사회공헌 활동 카테고리
"""

from enum import Enum
from dataclasses import dataclass


class CSRCategory(Enum):
    """사회공헌 활동 카테고리"""

    # 환경보호 (Environmental Protection)
    ENVIRONMENT = "environment"

    # 교육 지원 (Education Support)
    EDUCATION = "education"

    # 지역사회 발전 (Community Development)
    COMMUNITY = "community"

    # 보건/의료 (Health & Medical)
    HEALTH = "health"

    # 문화/예술 (Culture & Arts)
    CULTURE = "culture"

    # 재난구호 (Disaster Relief)
    DISASTER_RELIEF = "disaster_relief"

    # 취약계층 지원 (Support for Vulnerable Groups)
    WELFARE = "welfare"

    # 글로벌 사회공헌 (Global CSR)
    GLOBAL = "global"

    # 사회적 기업 지원 (Social Enterprise Support)
    SOCIAL_ENTERPRISE = "social_enterprise"

    # 윤리경영 (Ethical Management)
    ETHICS = "ethics"


@dataclass
class CategoryInfo:
    """카테고리 상세 정보"""
    category: CSRCategory
    name_ko: str
    name_en: str
    description: str
    sdg_goals: list[int]  # UN Sustainable Development Goals
    example_activities: list[str]


# 카테고리별 상세 정보
CATEGORY_DETAILS: dict[CSRCategory, CategoryInfo] = {
    CSRCategory.ENVIRONMENT: CategoryInfo(
        category=CSRCategory.ENVIRONMENT,
        name_ko="환경보호",
        name_en="Environmental Protection",
        description="환경 보전 및 지속가능한 발전을 위한 활동",
        sdg_goals=[6, 7, 12, 13, 14, 15],
        example_activities=[
            "탄소 중립 캠페인",
            "해변/산 정화 활동",
            "나무 심기",
            "플라스틱 줄이기 캠페인",
            "재활용 교육",
        ]
    ),
    CSRCategory.EDUCATION: CategoryInfo(
        category=CSRCategory.EDUCATION,
        name_ko="교육 지원",
        name_en="Education Support",
        description="교육 기회 확대 및 인재 양성 지원",
        sdg_goals=[4],
        example_activities=[
            "장학금 지원",
            "멘토링 프로그램",
            "IT 교육 봉사",
            "도서 기증",
            "진로 상담",
        ]
    ),
    CSRCategory.COMMUNITY: CategoryInfo(
        category=CSRCategory.COMMUNITY,
        name_ko="지역사회 발전",
        name_en="Community Development",
        description="지역사회와 함께하는 상생 발전 활동",
        sdg_goals=[11, 17],
        example_activities=[
            "지역 축제 후원",
            "사회적 인프라 구축",
            "마을 가꾸기",
            "지역 상품 구매",
            "주민 역량 강화",
        ]
    ),
    CSRCategory.HEALTH: CategoryInfo(
        category=CSRCategory.HEALTH,
        name_ko="보건/의료",
        name_en="Health & Medical",
        description="건강 증진 및 의료 서비스 지원",
        sdg_goals=[3],
        example_activities=[
            "무료 건강검진",
            "헌혈 캠페인",
            "의료 봉사",
            "정신건강 프로그램",
            "의료비 지원",
        ]
    ),
    CSRCategory.CULTURE: CategoryInfo(
        category=CSRCategory.CULTURE,
        name_ko="문화/예술",
        name_en="Culture & Arts",
        description="문화 예술 진흥 및 접근성 향상",
        sdg_goals=[4, 11],
        example_activities=[
            "문화공연 후원",
            "예술 교육 지원",
            "박물관/미술관 연계",
            "전통문화 보존",
            "문화 소외계층 초청",
        ]
    ),
    CSRCategory.DISASTER_RELIEF: CategoryInfo(
        category=CSRCategory.DISASTER_RELIEF,
        name_ko="재난구호",
        name_en="Disaster Relief",
        description="재난 피해 복구 및 예방 지원",
        sdg_goals=[1, 11, 13],
        example_activities=[
            "재난 성금 모금",
            "구호물품 지원",
            "복구 봉사활동",
            "이재민 지원",
            "재난 예방 교육",
        ]
    ),
    CSRCategory.WELFARE: CategoryInfo(
        category=CSRCategory.WELFARE,
        name_ko="취약계층 지원",
        name_en="Support for Vulnerable Groups",
        description="사회적 약자 및 취약계층 지원",
        sdg_goals=[1, 2, 10],
        example_activities=[
            "독거노인 돌봄",
            "아동/청소년 지원",
            "장애인 지원",
            "다문화가정 지원",
            "노숙인 지원",
        ]
    ),
    CSRCategory.GLOBAL: CategoryInfo(
        category=CSRCategory.GLOBAL,
        name_ko="글로벌 사회공헌",
        name_en="Global CSR",
        description="국제 사회 발전을 위한 글로벌 활동",
        sdg_goals=[1, 2, 3, 4, 6, 17],
        example_activities=[
            "해외 봉사활동",
            "국제기구 협력",
            "개발도상국 지원",
            "글로벌 환경 캠페인",
            "국제 인도적 지원",
        ]
    ),
    CSRCategory.SOCIAL_ENTERPRISE: CategoryInfo(
        category=CSRCategory.SOCIAL_ENTERPRISE,
        name_ko="사회적 기업 지원",
        name_en="Social Enterprise Support",
        description="사회적 가치 창출 기업 육성 및 지원",
        sdg_goals=[8, 9, 12],
        example_activities=[
            "사회적 기업 제품 구매",
            "창업 지원",
            "경영 컨설팅",
            "판로 개척 지원",
            "사회적 투자",
        ]
    ),
    CSRCategory.ETHICS: CategoryInfo(
        category=CSRCategory.ETHICS,
        name_ko="윤리경영",
        name_en="Ethical Management",
        description="투명하고 공정한 기업 운영",
        sdg_goals=[8, 16],
        example_activities=[
            "윤리강령 수립",
            "반부패 교육",
            "공정거래 실천",
            "정보보호",
            "이해관계자 소통",
        ]
    ),
}


def get_category_info(category: CSRCategory) -> CategoryInfo:
    """카테고리 정보 조회"""
    return CATEGORY_DETAILS[category]


def get_categories_by_sdg(sdg_goal: int) -> list[CSRCategory]:
    """SDG 목표별 관련 카테고리 조회"""
    return [
        info.category
        for info in CATEGORY_DETAILS.values()
        if sdg_goal in info.sdg_goals
    ]


def get_all_categories() -> list[CategoryInfo]:
    """모든 카테고리 정보 조회"""
    return list(CATEGORY_DETAILS.values())
