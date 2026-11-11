# 🔍 BPMN Change Impact Mapping with Semantic Retrieval 🔍
### Project Group 1
**📚 Coursework: Enterprise System**

**👤 Member:**
|Name|NRP|
|---|---|
|Rangga Aulia Pradana|5025201154|
|Putriani Pirma A. Sagala|5025231045|
|Adelia Rahmatus Sa'dia|5025231054|


## Project Overview 💡
A web-based application designed to identify potentially affected source code when changes occur in a Business Process Model and Notation (BPMN) diagram.

The project aims to connect BPMN changes with relevant source code using Semantic Retrieval, helping developers understand which parts of a software system may need further inspection after a business process modification.

Changes in business processes may affect multiple parts of an application's source code. However, identifying these dependencies manually can be time-consuming and difficult, especially in large software projects.

BPMN Impact Analyzer aims to address this problem by comparing two BPMN versions, detecting process changes, and retrieving potentially related source code using semantic similarity.

## Main Features 🗝️
The application consists of four main pages:

**1. Home Page 🚪**

* Provides an overview of the BPMN Impact Analyzer.
* Displays the target repository information.
* Provides navigation to start a new analysis.

**2. Upload Page 📩**

* Allows users to select the previous and updated BPMN files.
* Supports .bpmn and .xml file formats.
* Provides file selection and drag-and-drop interactions.
* Validates selected file formats.

**3. Analysis Results Page 🧐**

* Displays a summary of the analysis.
* Shows detected BPMN changes.
* Lists potentially affected source code files.
* Displays relevance scores for retrieved files.
* Provides navigation to the Code Inspector page.
* Supports exporting a sample analysis report in JSON format. 

**4. Code Inspector Page 📝**

* Displays source code snippets associated with selected files.
* Highlights potentially affected code sections.
* Shows related BPMN activity information.
* Displays semantic relevance scores and retrieval explanations.
* Provides recommended actions for developers.

## Technology Stack 🛠️
|Technology|Purpose|
|---|---|
|Next.js|Frontend framework|
|React|User interface development|
|TypeScript|Type-safe development|
|Tailwind CSS|Styling and responsive layouts|
|Lucide React|UI icons|

## Project Structure 🗂️
```
projectsemanticg1/
├── public/
├── src/
│   ├── app/
│   │   ├── analysis/
│   │   │   └── page.tsx
│   │   ├── code-inspector/
│   │   │   └── page.tsx
│   │   ├── upload/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── layout/
│       │   └── Navbar.tsx
│       └── ui/
│           ├── Badge.tsx
│           ├── Button.tsx
│           └── Card.tsx
├── package.json
└── README.md
```

## Getting Started 📍
**Prerequisites**
Make sure you have installed:
* Node.js (LTS version recommended)
* npm
* Git
### 1. Clone the Repository

` git clone ttps://github.com/PutrianiiPas/projectsemanticg1.git `

### 2. Navigate to the Project Directory

` cd projectsemanticg1 `

### 3. Install Dependencies

` npm install `

### 4. Run the Development Server

` npm run dev `

### 5. Open the Application
Visit:

` http://localhost:3000 `

## Current Development Progress ⚙️
**Frontend Development — Initial Implementation Completed [ 10-11-2026 ]**
The initial frontend implementation has been completed, including:
* Four main application pages.
* Responsive user interface.
* Navigation between pages.
* BPMN file selection and client-side validation.
* Mock analysis results and affected source code.
* Basic interactions for report export and code inspection.

Note: The current frontend **still uses mock data**. BPMN parsing, change detection, Semantic Retrieval, and backend API integration have not yet been implemented.

## Next Development Steps
The following tasks are planned for the next development phase:

**1. BPMN Processing**

* Parse uploaded BPMN/XML files.
* Extract BPMN elements and relationships.
* Compare previous and updated BPMN versions.
* Detect added, modified, and deleted elements.

**2. Semantic Retrieval**

* Extract relevant information from source code.
* Generate semantic representations or embeddings.
* Retrieve source code related to detected BPMN changes.
* Calculate similarity scores and rank potentially affected code.

**3. Backend Development**

* Implement API endpoints for file uploads and analysis.
* Process BPMN changes and semantic retrieval results.
* Provide analysis results and code details to the frontend.

**4. Frontend and Backend Integration**

* Replace mock data with actual backend responses.
* Display real BPMN change detection results.
* Display actual affected source code and relevance scores.
* Implement loading, error, and empty states.
