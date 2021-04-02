import React from 'react'

const CustomInput = ({ label, type = 'text', name, placeholder, value, onChange, onBlur, error }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control has-icons-left has-icons-right">
        <input 
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          name={name} 
          value={value} 
          onChange={onChange} 
          onBlur={onBlur}
          className={`input${(error) ? ' is-danger' : ''}`} />
          <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
          <span className="icon is-small is-right"><i className="fas fa-exclamation-triangle"></i></span>
      </div>
      { 
          (error) && <p className="help is-danger">{error}</p> 
      }
    </div>
  )
}

export default CustomInput
