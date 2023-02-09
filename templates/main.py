from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.enums import TA_JUSTIFY

def generate_prescription(patient_name, doctor_name, medicine_list, logo_path, rx_path, signature_path, prescription_no, consultation_no, doctor_email, medconnect_id, reg_no, doctor_location, patient_id, patient_location, date, remarks, doctor_title):
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
    c.drawRightString(570, 735, f"#{prescription_no}")

    c.drawRightString(525, 720 , "Consultation No:")
    c.setFont("Courier", 13)
    c.drawRightString(570, 720, f"#{consultation_no}")

    #Doctor Details
    c.setFillColor(colors.black)
    c.setFont("Courier", 13)

    c.drawRightString(570, 680 , "+917738118110")

    c.drawRightString(570, 665 , f"{doctor_email}")


    c.drawRightString(450, 650 , "MedConnect Id.: ")
    c.setFont("Courier", 13)
    c.drawRightString(570, 650 , f"{medconnect_id}")


    c.drawRightString(450, 635 , "Reg. No.: ")
    c.setFont("Courier", 13)
    c.drawRightString(570, 635 , f"{reg_no}")

    #Doctor Headers
    c.setFont("Courier-Bold", 21)
    c.drawString(12, 680, f"Dr. {doctor_name}")
    c.setFont("Courier", 13)
    c.drawString(12, 665 , f"{doctor_location}")
    

    # Patient Details
    c.setFont("Courier", 13)
    c.drawString(12, 620 , "Patient Id:")
    c.drawString(100, 620 , f"# {patient_id}")
    c.drawString(12, 605 , "Patient:")
    c.setFont("Courier-Bold", 13)
    c.drawString(100, 605 , f"{patient_name}")
    c.setFont("Courier", 13)
    c.drawString(100, 590 , f"{patient_location}")
    c.drawString(12, 575 , "Date:")
    c.drawString(100, 575 , f"{date}")

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

    p = Paragraph(remarks, style)
    p.wrapOn(c, 558, 100)
    p.drawOn(c, 12, 140)


    c.drawImage(signature_path, 456, 66, width=86, height=39)
    c.setFont("Courier-Bold", 13)
    c.drawRightString(570, 47 , f"{doctor_name}")
    c.setFont("Courier", 10)
    c.drawRightString(570, 33 , f"{doctor_title}")

    c.line(12, 18, 570, 18)
    c.setFont("Courier", 10)
    c.drawString(12, 5, "Thank you for choosing MedConnect. Have a Healthy Day!")

    # Save the PDF
    c.save()


medicine_list = [
    ("Tablet","Paracetamol", "500 mg", "1-0-1", "-"),
    ("Tablet","Probiotia", "60 Billion", "0-1-0", "Supplementary Diet"),
    ("Tablet","Cilacar", "10 mg", "1-0-0", "-"),
    ("Misc","Glimer", "0.5 mg", "1-0-1", "-"),
    ("Tablet","Volibo", "2 mg", "0-1-1", "-"),
    ("Tablet","Rosuvas", "10 mg", "0-0-1", "-"),
    ]

remarks = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."

generate_prescription("John Doe", "Jane Smith", medicine_list, "medconnect_logo.jpg", "rx_logo.jpg", "Shubham_Sign.jpeg", "1", "1", "doctor@gmail.com", "1", "123454321234", "Thane, India", "1", "Nere, India", "01 January 2022", remarks, "DNB (Nephro)")


# patient_name, doctor_name, medicine_list, logo_path, rx_path, signature_path, prescription_no, consultation_no, doctor_email, medconnect_id, reg_no, doctor_location, patient_id, patient_location, date, remarks, doctor_title


