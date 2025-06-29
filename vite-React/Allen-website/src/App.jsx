import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Exams from "./components/Exams";
import Programs from "./components/Programs";
import Scholarships from "./components/Scholarships";
import TestSeries from "./components/Test-Series";
import StudyMaterials from "./components/Study-Materials";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Layout />} />
                    <Route path="exams" element={<Exams />} />
                    <Route path="programs" element={<Programs />} />
                    <Route path="scholarships" element={<Scholarships />} />
                    <Route path="test-series" element={<TestSeries />} />
                    <Route path="study-materials" element={<StudyMaterials />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;