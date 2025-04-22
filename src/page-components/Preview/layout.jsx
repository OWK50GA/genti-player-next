
// .preview-content-wrapper {
//     position: absolute;
//     bottom: 0;
//     width: 100%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

export default function PreviewTopLayout({ children }) {
  return (
    <div style={{ 
      // height: '100vh', 
      width: '100%', 
      position: 'relative',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, #121212C9, #050606)',
        zIndex: 10
      }}></div>

      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(/assets/img/authbg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 20,
        height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        gap: '2rem',
        // padding: '1rem',
        // textAlign: 'center'
      }}>
        {children}
      </div>
      {/* <div style={{width: '80%'}}>
        {children}
      </div> */}
    </div>
  );
}
