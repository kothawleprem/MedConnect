from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_JUSTIFY

def generate_prescription(patient_name, doctor_name, medicine_list, logo_path, rx_path, signature_path):
    # Create a file named after the patient
    filename = f"{patient_name}_prescription.pdf"
    c = canvas.Canvas(filename, pagesize=A4, bottomup=1)
    

    # MedConnect Logo
    c.setFillColor(colors.white)
    c.drawImage(logo_path, 12, 759 - 16, width=169, height=83.12)

    # Rx logo
    c.drawImage(rx_path, 595-60-12, 759 - 4, width=60, height=60)

    # Document Nos.
    c.setFillColor(colors.black)

    c.setFont("Courier", 13)
    c.drawRightString(525, 735 , "Prescription No:")
    c.setFont("Courier", 13)
    c.drawRightString(570, 735, "#1")

    c.drawRightString(525, 720 , "Consultation No:")
    c.setFont("Courier", 13)
    c.drawRightString(570, 720, "#12345")

    #Doctor Details
    c.setFillColor(colors.black)
    c.setFont("Courier", 13)

    c.drawRightString(570, 680 , "+917738118110")

    c.drawRightString(570, 665 , "kothawleprem1234@gmail.com")


    c.drawRightString(450, 650 , "MedConnect Id.: ")
    c.setFont("Courier", 13)
    c.drawRightString(570, 650 , "ABCD 1234567")


    c.drawRightString(450, 635 , "Reg. No.: ")
    c.setFont("Courier", 13)
    c.drawRightString(570, 635 , "12ABCDE1234A1AB")

    #Doctor Headers
    c.setFont("Courier-Bold", 21)
    c.drawString(12, 680, "Dr. Shubham Saroj")
    c.setFont("Courier", 13)
    c.drawString(12, 665 , "Thane, India")
    

    # Patient Details
    c.setFont("Courier", 13)
    c.drawString(12, 620 , "Patient Id:")
    c.drawString(100, 620 , "#12334")
    c.drawString(12, 605 , "Patient:")
    c.setFont("Courier-Bold", 13)
    c.drawString(100, 605 , "Mr. Prem Kothawle")
    c.setFont("Courier", 13)
    c.drawString(100, 590 , "Nere, Panvel")
    c.drawString(12, 575 , "Date:")
    c.drawString(100, 575 , "01 January 2023")

    c.setFont("Courier-Bold", 18)
    c.drawString(12, 530 , "Treatment Advised")


    

    # Add a table with the medicine list
    c.setFont("Courier-Bold", 13)
    c.drawString(12, 500, "Type")
    c.drawString(97, 500, "Medicine")
    c.drawString(242, 500, "Power")
    c.drawString(346, 500, "Frequency")
    c.drawString(440, 500, "Remarks")
    c.setStrokeColor(colors.grey)
    c.line(12, 490, 570, 490)
    c.setFont("Courier", 13)
    for i, medicine in enumerate(medicine_list):
        c.drawString(12, 475 - i * 25, medicine[0])
        c.drawString(97, 475 - i * 25, medicine[1])
        c.drawString(242, 475 - i * 25, medicine[2])
        c.drawString(346, 475 - i * 25, medicine[3])
        c.drawString(440, 475 - i * 25, medicine[4])

    c.setFont("Courier-Bold", 18)
    c.drawString(12, 280 , "Next Investigation / Other Remarks")
    style = getSampleStyleSheet()["Normal"]
    style.fontName = "Courier"
    style.fontSize = 12
    style.alignment = TA_JUSTIFY

    p = Paragraph("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ", style)
    p.wrapOn(c, 558, 100)
    p.drawOn(c, 12, 140)


    c.drawImage(signature_path, 456, 66, width=86, height=39)
    c.setFont("Courier-Bold", 13)
    c.drawRightString(570, 47 , "Dr. Shubham Saroj")
    c.setFont("Courier", 10)
    c.drawRightString(570, 33 , "MD. DNB (Nephro)")

    c.line(12, 18, 570, 18)
    c.setFont("Courier", 10)
    c.drawString(12, 5, "Thank you for choosing MedConnect. Have a Healthy Day!")

    # Save the PDF
    c.save()

# Example usage
medicine_list = [
    ("Tablet","Paracetamol", "500 mg", "1-0-1", "-"),
    ("Tablet","Probiotia", "60 Billion", "0-1-0", "Supplementary Diet"),
    ("Tablet","Cilacar", "10 mg", "1-0-0", "-"),
    ("Misc","Glimer", "0.5 mg", "1-0-1", "-"),
    ("Tablet","Volibo", "2 mg", "0-1-1", "-"),
    ("Tablet","Rosuvas", "10 mg", "0-0-1", "-"),
    ]

generate_prescription("John Doe", "Dr. Jane Smith", medicine_list, "medconnect_logo.jpg", "rx_logo.jpg", "Shubham_Sign.jpeg")
