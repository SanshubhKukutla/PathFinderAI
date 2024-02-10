import PyPDF2

def pdf_to_text(pdf_path, text_path):
    try:
        with open(pdf_path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text_content = ''
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text_content += page.extract_text()

            with open(text_path, 'w', encoding='utf-8') as text_file:
                text_file.write(text_content)

            print("Conversion successful. Text saved to", text_path)

    except Exception as e:
        print("Error:", str(e))

pdf_to_text('JasonRandolphResume.pdf', 'output.txt')
