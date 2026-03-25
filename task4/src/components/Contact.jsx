import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '1rem',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#202020',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Message Sent Successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ 
      background: '#272727', 
      padding: '30px', 
      borderRadius: '15px', 
      width: '100%', 
      maxWidth: '400px'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' , color: 'blue'}}>Contact Us</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="name" placeholder="Name" style={inputStyle} value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" style={inputStyle} value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" style={{ ...inputStyle, minHeight: '100px' }} value={formData.message} onChange={handleChange} required />
        <button type="submit" style={buttonStyle} onMouseOver={(e) => e.target.style.backgroundColor = '#7d7d7d'} onMouseOut={(e) => e.target.style.backgroundColor = '#202020'}>
          Send Message
        </button>
      </form>
    </div>
  );
}