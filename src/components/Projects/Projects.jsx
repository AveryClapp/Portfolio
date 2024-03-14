import styles from "./Projects.css"

//  Project Name
//  Project Description
//  Increase in size on hover

const Projects = (props) => {
    return (
        <div className="project-wrapper">
            <h1>{props.name}</h1>
            <p>{props.desc}</p>
        </div>
    )
}

export default Projects;