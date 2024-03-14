import styles from './header.css'

const Header = () => {
    // $(window).on('scroll', () => {
    //     if ($(window).scrollTop()) {
    //         $("Header").addClass("Header2");
    //     } else {
    //         $("Header").removeClass("Header2");
    //     }
    // })

    return (
        <section className="Header">
            <div className="Name">Avery Clapp's Portfolio</div>
            <a href="#" className="dropdown">What I Do</a>
            <a href="#" className="Projects">Featured Projects</a>
            <a href="#" className="Contact"> Contact </a>
        </section>

)}

export default Header;