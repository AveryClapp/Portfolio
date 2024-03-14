import './App.css';
import Header from './components/Header/Header.jsx'
import Intro from './components/Intro/Intro.jsx'
import Feature from './components/Features/Feature.jsx'
import Contact from './components/Contact/Contact.jsx'
import Projects from './components/Projects/Projects.jsx';


function App() {
  return (
    <div>
      <Header></Header>
      <Intro></Intro>
      <div class="activities">
        <h1> What I Do </h1>
        <Feature name="Coding"></Feature>
        <Feature name="Swimming"></Feature>
        <Feature name="Guitar"></Feature>
      </div>
      <div class="projs">
        <h1>Projects</h1>
        <Projects name="Daily News Report" desc="
        I created a dynamic Daily News Report system that revolutionizes how users stay informed. By harnessing public APIs, the 
        system delivers 10 carefully curated business and general headlines straight to users' email inboxes every morning. This 
        automated process, orchestrated through Crontab, guarantees a consistent and timely delivery of news updates, 
        empowering users to start their day well-informed and prepared."></Projects>
        <Projects name="Instagram Botting Suite" desc="
        Crafting a comprehensive Instagram Botting Suite was a pivotal endeavor, offering unparalleled insights into follower 
        dynamics and account activities. This suite was meticulously designed to monitor follower metrics and identify instances 
        of account unfollows, as well as non-reciprocal followers. Powered by the Selenium library, a potent WebDriver took charge,
        seamlessly navigating Instagram's interface and executing intricate operations with precision."></Projects>
        <Projects name="Birthday Alerts" desc="The development of an automated Birthday Alerts system marked a significant milestone, 
        featuring a dedicated SQL database as its backbone. Through daily database queries, this system adeptly identifies individuals 
        commemorating birthdays, ensuring timely and personalized recognitions. This project underscores adept database management 
        skills and automation expertise, culminating in seamless and heartfelt birthday celebrations."></Projects>
        <Projects name="Gold Trading Algorithms" desc="
        Crafted a suite of 15+ trading algorithms focused on spot gold, integrating sentiment analysis and price dynamics for strategic 
        decision-making. Implemented streamlined data visualization automation to bolster algorithm performance, while a dedicated 
        Telegram Bot efficiently delivered trade updates to a subscriber base exceeding 100. Maintained 24/7 availability for after-hours
        troubleshooting, swiftly diagnosing and resolving site or portal issues to minimize downtime and ensure seamless operations."></Projects>
      </div>
      <Contact></Contact>
    </div>
  );
}

export default App;
