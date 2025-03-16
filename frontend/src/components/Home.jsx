import Landing from './Landing.jsx';
import Text from "../Text/Text.jsx";
import PracticeAreas from './PracticesAreas.jsx';
import ContactForm from './ContactForm.jsx';
import Footer from './Footer.jsx';


const Home = () => {
    return (
        <div>
            <Landing />
            <Text />
            <PracticeAreas />
            <ContactForm />
            <Footer />
        </div>
    )
}
export default Home;