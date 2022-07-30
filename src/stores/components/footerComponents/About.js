import { Avatar } from '@material-ui/core'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

const About = () => {
    return (
        <div className="about">
             <div className="about__title">
                 <h2>Welcome to Apneehatti</h2>
             </div>
             <div className="about__story">
                 <div className="about__story__img">
                    <img src="/pictures/apneehatti_logo.svg"/>
                 </div>
                 <div className="about__story__content">
                     <h5 className="story__title">Apneehatti the story</h5>
                     <h5 className="launch">Launched in december 2021</h5>
                     <h6>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</h6>
                 </div>
             </div>
             <div className="about__story__member">
                 <div className="member__title">
                      <h2>Start by a team</h2>
                 </div>
                <div className="about__story__card__grid">
                    
                <div className="about__story__card">
                    <div className="about__story__card__pic">
                    <Avatar/>
                    </div>
                    <h5>Kunal Bhosle</h5>
                    <h6><LabelImportantIcon/> FullStack Web Developer</h6>
                    <h6><EmailIcon/> bhoslekunal96k@gmail.com</h6>
                </div>

                
                <div className="about__story__card">
                    <div className="about__story__card__pic">
                    <Avatar/>
                    </div>
                    <h5>Kunal Bhosle</h5>
                    <h6><LabelImportantIcon/> FullStack Web Developer</h6>
                    <h6><EmailIcon/> bhoslekunal96k@gmail.com</h6>

                </div>

                
                <div className="about__story__card">
                    <div className="about__story__card__pic">
                    <Avatar/>
                    </div>
                    <h5>Kunal Bhosle</h5>
                    <h6><LabelImportantIcon/> FullStack Web Developer</h6>
                    <h6><EmailIcon/> bhoslekunal96k@gmail.com</h6>

                </div>
               </div>
             </div>
        </div>
    )
}

export default About
