"""
CSR Report Generator
사회공헌 보고서 생성기
"""

from datetime import date, datetime
from typing import Optional
import json

from .tracker import CSRTracker
from .models import CSRProgram, ProgramStatus
from .categories import CATEGORY_DETAILS, CSRCategory


class CSRReportGenerator:
    """사회공헌 보고서 생성"""

    def __init__(self, tracker: CSRTracker):
        self.tracker = tracker

    def generate_summary_report(self) -> dict:
        """전체 요약 보고서"""
        return {
            "report_type": "summary",
            "generated_at": datetime.now().isoformat(),
            "overview": {
                "total_programs": len(self.tracker.programs),
                "active_programs": self.tracker.get_active_programs_count(),
                "total_volunteers": self.tracker.get_total_participants(),
                "total_volunteer_hours": self.tracker.get_total_volunteer_hours(),
                "total_donations_krw": self.tracker.get_total_donations("KRW"),
                "total_activities": len(self.tracker.activities),
            },
            "by_category": self.tracker.get_stats_by_category(),
            "impact_summary": self.tracker.get_impact_summary(),
        }

    def generate_annual_report(self, year: int) -> dict:
        """연간 보고서"""
        yearly_summary = self.tracker.get_yearly_summary(year)

        return {
            "report_type": "annual",
            "year": year,
            "generated_at": datetime.now().isoformat(),
            "summary": yearly_summary,
            "top_volunteers": [
                {
                    "name": v.name,
                    "department": v.department,
                    "hours": v.total_hours,
                    "activities": v.activities_count,
                }
                for v in self.tracker.get_top_volunteers(10)
            ],
            "programs": [
                self._program_to_dict(p)
                for p in self.tracker.programs.values()
                if p.start_date.year <= year and (
                    p.end_date is None or p.end_date.year >= year
                )
            ],
        }

    def generate_program_report(self, program_id: str) -> Optional[dict]:
        """프로그램별 상세 보고서"""
        program = self.tracker.get_program(program_id)
        if not program:
            return None

        return {
            "report_type": "program",
            "generated_at": datetime.now().isoformat(),
            "program": self._program_to_dict(program),
            "activities": [
                self._activity_to_dict(a) for a in program.activities
            ],
            "donations": [
                self._donation_to_dict(d) for d in program.donations
            ],
            "impact_metrics": [
                self._metric_to_dict(m) for m in program.impact_metrics
            ],
            "statistics": {
                "total_volunteer_hours": program.get_total_volunteer_hours(),
                "total_donations": program.get_total_donations(),
                "total_participants": program.get_total_participants(),
                "beneficiary_achievement_rate": program.get_beneficiary_achievement_rate(),
            },
        }

    def generate_category_report(self, category: CSRCategory) -> dict:
        """카테고리별 보고서"""
        category_info = CATEGORY_DETAILS[category]
        programs = [
            p for p in self.tracker.programs.values()
            if p.category == category.value
        ]

        total_hours = sum(p.get_total_volunteer_hours() for p in programs)
        total_donations = sum(p.get_total_donations() for p in programs)
        total_beneficiaries = sum(p.actual_beneficiaries for p in programs)

        return {
            "report_type": "category",
            "generated_at": datetime.now().isoformat(),
            "category": {
                "code": category.value,
                "name_ko": category_info.name_ko,
                "name_en": category_info.name_en,
                "description": category_info.description,
                "sdg_goals": category_info.sdg_goals,
            },
            "statistics": {
                "total_programs": len(programs),
                "total_volunteer_hours": total_hours,
                "total_donations": total_donations,
                "total_beneficiaries": total_beneficiaries,
            },
            "programs": [
                self._program_to_dict(p) for p in programs
            ],
        }

    def generate_volunteer_report(self, volunteer_id: str) -> Optional[dict]:
        """봉사자별 활동 보고서"""
        volunteer = self.tracker.get_volunteer(volunteer_id)
        if not volunteer:
            return None

        participated_activities = [
            a for a in self.tracker.activities.values()
            if volunteer_id in a.participants
        ]

        return {
            "report_type": "volunteer",
            "generated_at": datetime.now().isoformat(),
            "volunteer": {
                "id": volunteer.volunteer_id,
                "name": volunteer.name,
                "department": volunteer.department,
                "total_hours": volunteer.total_hours,
                "activities_count": volunteer.activities_count,
                "joined_date": volunteer.joined_date.isoformat(),
            },
            "activities": [
                self._activity_to_dict(a) for a in participated_activities
            ],
        }

    def export_to_json(self, report: dict, filepath: str) -> None:
        """보고서를 JSON 파일로 내보내기"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)

    def format_text_report(self, report: dict) -> str:
        """텍스트 형식 보고서 생성"""
        lines = []
        report_type = report.get("report_type", "unknown")

        lines.append("=" * 60)
        lines.append(f"CSR 보고서 - {report_type.upper()}")
        lines.append(f"생성일시: {report.get('generated_at', 'N/A')}")
        lines.append("=" * 60)

        if report_type == "summary":
            overview = report.get("overview", {})
            lines.append("\n[개요]")
            lines.append(f"  - 총 프로그램: {overview.get('total_programs', 0)}개")
            lines.append(f"  - 진행중 프로그램: {overview.get('active_programs', 0)}개")
            lines.append(f"  - 총 봉사자: {overview.get('total_volunteers', 0)}명")
            lines.append(f"  - 총 봉사시간: {overview.get('total_volunteer_hours', 0):.1f}시간")
            lines.append(f"  - 총 기부금: ₩{overview.get('total_donations_krw', 0):,.0f}")

        elif report_type == "annual":
            summary = report.get("summary", {})
            lines.append(f"\n[{report.get('year', 'N/A')}년 연간 요약]")
            lines.append(f"  - 활동 수: {summary.get('total_activities', 0)}건")
            lines.append(f"  - 봉사시간: {summary.get('total_volunteer_hours', 0):.1f}시간")
            lines.append(f"  - 기부금: ₩{summary.get('total_donations', 0):,.0f}")
            lines.append(f"  - 참여인원: {summary.get('total_participants', 0)}명")

        lines.append("\n" + "=" * 60)
        return "\n".join(lines)

    def _program_to_dict(self, program: CSRProgram) -> dict:
        """프로그램을 딕셔너리로 변환"""
        return {
            "program_id": program.program_id,
            "name": program.name,
            "description": program.description,
            "category": program.category,
            "status": program.status.value,
            "start_date": program.start_date.isoformat(),
            "end_date": program.end_date.isoformat() if program.end_date else None,
            "budget": program.budget,
            "target_beneficiaries": program.target_beneficiaries,
            "actual_beneficiaries": program.actual_beneficiaries,
            "responsible_department": program.responsible_department,
            "partner_organizations": program.partner_organizations,
        }

    def _activity_to_dict(self, activity) -> dict:
        """활동을 딕셔너리로 변환"""
        return {
            "activity_id": activity.activity_id,
            "name": activity.name,
            "description": activity.description,
            "category": activity.category,
            "type": activity.activity_type.value,
            "start_date": activity.start_date.isoformat(),
            "end_date": activity.end_date.isoformat() if activity.end_date else None,
            "location": activity.location,
            "participants": len(activity.participants),
            "volunteer_hours": activity.volunteer_hours,
            "status": activity.status.value,
        }

    def _donation_to_dict(self, donation) -> dict:
        """기부를 딕셔너리로 변환"""
        return {
            "donation_id": donation.donation_id,
            "donor_name": donation.donor_name,
            "donor_type": donation.donor_type,
            "amount": donation.amount,
            "currency": donation.currency,
            "formatted_amount": donation.get_formatted_amount(),
            "donation_date": donation.donation_date.isoformat(),
            "recipient": donation.recipient,
            "purpose": donation.purpose,
        }

    def _metric_to_dict(self, metric) -> dict:
        """지표를 딕셔너리로 변환"""
        return {
            "metric_id": metric.metric_id,
            "name": metric.name,
            "description": metric.description,
            "value": metric.value,
            "unit": metric.unit,
            "target_value": metric.target_value,
            "achievement_rate": metric.get_achievement_rate(),
        }
