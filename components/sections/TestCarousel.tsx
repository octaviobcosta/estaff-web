// TestCarousel.tsx - Static test component without any client-side features

const TestCarousel = () => {
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#ff0000', 
      color: 'white',
      fontSize: '24px',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      🚨 TEST CAROUSEL IS VISIBLE! 🚨
      <br />
      If you see this RED section, the component is rendering correctly!
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <img src="/logocarrossel/arcos.png" alt="Test 1" style={{ height: '50px' }} />
        <img src="/logocarrossel/brahma.png" alt="Test 2" style={{ height: '50px' }} />
        <img src="/logocarrossel/riviera.png" alt="Test 3" style={{ height: '50px' }} />
      </div>
    </div>
  )
}

export default TestCarousel