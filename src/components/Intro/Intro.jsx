import styles from "./intro.css"

const Intro = () => {
    return (
        <section className="intro">
            <h1 className="greeting">Hi, I'm Avery</h1>
            <div className="animated-text">
                I'm a <span></span>
            </div>
            <p className="bio"> Computer Science and Economics double major at Johns Hopkins University.<br></br>
             Eager to learn and gain experience across many fronts in the tech world. <br></br>
             Passionate about the intersection between Finance and Technology and <br></br>
             how we can use it to shape a better tomorrow!
            </p>
            <div class="button">
                <a href="/Users/averyclapp/Documents/Coding%20Stuff/portfolio/public/SophResumeNew.pdf" className="resume">My Resume</a>
                <a href="public/SophResumeNew.pdf" className="contact">Get in Touch</a>
            </div>
        </section>
    )
}

export default Intro