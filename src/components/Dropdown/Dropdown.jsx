import React, { useState } from 'react'
import {
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonSelectOption
} from '@ionic/react'

const Dropdown = ({ label, options, selectedValue, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  // Support both array of objects (with caseLabel) and array of strings
  const filteredOptions = searchTerm.trim() === ''
    ? options.filter(opt => (typeof opt === 'string' && !!opt) || (opt && !!opt.caseLabel))
    : options.filter(option => {
        if (typeof option === 'string') {
          return option.toLowerCase().includes(searchTerm.toLowerCase())
        } else if (option && option.caseLabel) {
          return option.caseLabel.toLowerCase().includes(searchTerm.toLowerCase())
        }
        return false
      })

  return (
    <IonItem style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <IonLabel position='floating'>{label}</IonLabel>
      <IonInput
        value={searchTerm}
        placeholder={`Search ${label.toLowerCase()}...`}
        onIonChange={e => {
          setSearchTerm(e.detail.value)
          setShowOptions(true)
        }}
        onFocus={() => setShowOptions(true)}
        style={{ marginBottom: 8 }}
      />
      {showOptions && (
        <IonList style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ccc', borderRadius: 8, zIndex: 1000, background: 'white' }}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const value = typeof option === 'string' ? option : option.caseLabel
              return (
                <IonSelectOption
                  key={option._id || value || index}
                  value={value}
                  onClick={() => {
                    onSelect(value)
                    setSearchTerm(value)
                    setShowOptions(false)
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {value}
                </IonSelectOption>
              )
            })
          ) : (
            <div style={{ padding: 8, color: '#888' }}>No options found</div>
          )}
        </IonList>
      )}
    </IonItem>
  )
}

export default Dropdown
