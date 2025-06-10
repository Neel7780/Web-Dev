import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Exams from "./components/Exams";
import Programs from "./components/Programs";
import Scholarships from "./components/Scholarships";
import TestSeries from "./components/Test-Series";
import StudyMaterials from "./components/Study-Materials";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/test-series" element={<TestSeries />} />
                <Route path="/study-materials" element={<StudyMaterials />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;