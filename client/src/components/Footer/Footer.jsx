import whatsappIcon from '../../assets/icons/whatsapp.png';
import emailIcon from '../../assets/icons/email.png';
import messengerIcon from '../../assets/icons/facebook.png';
import twitterIcon from '../../assets/icons/twitter.png';
import instagramIcon from '../../assets/icons/instagram.png'
import styles from './Footer.module.css';
import { useUpdateMainContext } from '../../contexts/MainContext';

const Footer = () => {
  const { changeView } = useUpdateMainContext()
  return (
    <footer className={`text-center bg-dark text-light p-5 ${styles.Footer}`}>
        <div>
            <p>Copyright&copy; {new Date().getFullYear()} ArtExhibit</p>
            <p>All rights reserved</p>
        </div>
        <div className={`${styles.SocialIconsDiv}`}>
            <a href='https://whatsapp.com'><img src={emailIcon} alt='connect with ArtExhibit on whatsapp'/></a>
            <a href='https://whatsapp.com'><img src={whatsappIcon} alt='connect with ArtExhibit on whatsapp'/></a>
            <a href='https://whatsapp.com'><img src={messengerIcon} alt='connect with ArtExhibit on whatsapp'/></a>
            <a href='https://whatsapp.com'><img src={twitterIcon} alt='connect with ArtExhibit on whatsapp'/></a>
            <a href='https://whatsapp.com'><img src={instagramIcon} alt='connect with ArtExhibit on whatsapp'/></a>
        </div>
        <div className={styles.ActionButtons}>
          <p>Developed by:&nbsp;<a className='text-light' href='https://github.com/jerrywonder2126'>Jerry Wonder</a></p>
          <button onClick={() => changeView('dashboard')}>For Moderators</button>
        </div>
    </footer>
  )
}

export default Footer