from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

content = "RAKSHANDA KOWSAR\n\nI want this should be view in my resume and when they download my resume"
path = Path("public/resume.pdf")
path.parent.mkdir(parents=True, exist_ok=True)

story = []
style = ParagraphStyle(
    name="Resume",
    fontName="Helvetica",
    fontSize=12,
    leading=16,
    textColor=colors.black,
    alignment=TA_LEFT,
)
story.append(Paragraph(content.replace("\n", "<br />"), style))
story.append(Spacer(1, 12))

doc = SimpleDocTemplate(str(path), pagesize=letter, leftMargin=36, rightMargin=36, topMargin=36, bottomMargin=36)
doc.build(story)
print(f"Wrote {path}")
