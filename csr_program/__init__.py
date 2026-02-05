"""
Corporate Social Responsibility (CSR) Program
기업 사회공헌 프로그램 관리 시스템

A comprehensive system for managing corporate social responsibility
activities, volunteer programs, donations, and impact tracking.
"""

from .models import (
    CSRProgram,
    Activity,
    Volunteer,
    Donation,
    ImpactMetric,
)
from .categories import CSRCategory
from .tracker import CSRTracker
from .reports import CSRReportGenerator

__version__ = "1.0.0"
__all__ = [
    "CSRProgram",
    "Activity",
    "Volunteer",
    "Donation",
    "ImpactMetric",
    "CSRCategory",
    "CSRTracker",
    "CSRReportGenerator",
]
