import './Loader.css'

const Loader = (props) => {
  const blockLevel = props.display || 'inline'
  const block = blockLevel === 'block'
  const {backdrop, borderRadius, noFlex, minHeight} = props
  const styles = {
    main: {
      display: !noFlex && 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: block && '1rem',
      minHeight: block && !props.clearHeight && '40vh',
      height: minHeight,
      backgroundColor: backdrop && 'rgb(33 37 41 / 54%)',
      borderRadius: backdrop && borderRadius,
      zIndex: '10'
    },
    loader: {
      borderColor: backdrop && 'var(--bs-light)',
      margin: backdrop && 'auto',
      marginTop: backdrop && 'calc(50% - 1rem)'
    }
  }
  return (
    <div style={styles.main}>
      {/* <div className='loader-box'>
          <p className='loading'></p>
      </div> */}
      <div className={`loader ${blockLevel}`} style={styles.loader}></div>
    </div>
  )
}

export default Loader