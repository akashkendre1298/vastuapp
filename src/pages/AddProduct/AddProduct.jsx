//@ts-nocheck
import React, { useState, useEffect } from 'react'
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCheckbox,
  IonButtons,
  IonBackButton,
  IonImg
} from '@ionic/react'
import { useLocation } from 'react-router-dom'
import logo from '../../Assets/pandit_shivkumar_logo.png'
import './AddProduct.css'
import useDebounce from '../../utils/useDebounce';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const location = useLocation()
  const [selectedCase, setSelectedCase] = useState('')
  const [caseData, setCaseData] = useState([])
  const [productName, setProductName] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [priority, setPriority] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [yantraName, setYantraName] = useState([])

  const [selectedProductNames, setselectedProductNames] = useState([])
  const [selectedYantraNames, setSelectedYantraNames] = useState([])
  const [productQuantities, setProductQuantities] = useState({})
  const [yantraQuantities, setYantraQuantities] = useState({})

  // Accordion state
  const [showProducts, setShowProducts] = useState(false);
  const [showYantras, setShowYantras] = useState(false);
  // Search state
  const [productSearch, setProductSearch] = useState("");
  const [yantraSearch, setYantraSearch] = useState("");
  // Accordion for case selection
  const [showCaseDropdown, setShowCaseDropdown] = useState(false);
  const [caseSearch, setCaseSearch] = useState("");
  const debouncedCaseSearch = useDebounce(caseSearch, 300);

  const handleProductSelection = selectedValues => {
    setselectedProductNames(selectedValues)
    console.log('Selected cases:', selectedValues)
  }

  const handleYantraSelection = selectedValues => {
    setSelectedYantraNames(selectedValues)
    console.log('Selected cases:', selectedValues)
  }

  useEffect(() => {
    // If navigated from ViewProduct with a selected case, set it on first mount
    if (location.state && location.state.selectedCase) {
      setSelectedCase(location.state.selectedCase);
    } else {
      setSelectedCase("");
    }
    // Always fetch case data from API
    fetch('https://backend.piyushshivkumarshhri.com/api/cases')
      .then(response => response.json())
      .then(data => {
        if (data.data && Array.isArray(data.data)) {
          setCaseData(data.data)
        } else {
          console.error('Error: Data is not in the expected format')
        }
      })
      .catch(error => {
        console.error('Error fetching cases:', error)
      })

    fetch('https://backend.piyushshivkumarshhri.com/api/master/products')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setProductName(data)
        } else {
          console.error('Error: Data is not in the expected format')
        }
      })
      .catch(error => {
        console.error('Error fetching cases:', error)
      })

    fetch('https://backend.piyushshivkumarshhri.com/api/master/yantra')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setYantraName(data)
        } else {
          console.error('Error: Data is not in the expected format')
        }
      })
      .catch(error => {
        console.error('Error fetching cases:', error)
      })
  }, [location.state]);

  const handleCaseSelection = selectedCaseLabel => {
    setSelectedCase(selectedCaseLabel)
  }

  // Handle product checkbox and quantity
  const handleProductQty = (name, delta) => {
    setProductQuantities(prev => {
      const qty = (prev[name] || 0) + delta
      if (qty <= 0) {
        const updated = { ...prev }
        delete updated[name]
        return updated
      }
      return { ...prev, [name]: qty }
    })
  }

  // Handle yantra checkbox and quantity
  const handleYantraQty = (name, delta) => {
    setYantraQuantities(prev => {
      const qty = (prev[name] || 0) + delta
      if (qty <= 0) {
        const updated = { ...prev }
        delete updated[name]
        return updated
      }
      return { ...prev, [name]: qty }
    })
  }

  // Update handleSaveProduct to use productQuantities and yantraQuantities
  const handleSaveProduct = () => {
    // Filter out zero-quantity items
    const filteredProducts = Object.entries(productQuantities)
      .filter(([k, v]) => v > 0)
      .map(([name, qty]) => {
        const prod = productName.find(p => p.name === name);
        return {
          product_name: name,
          product_quantity: qty,
          _id: prod && prod._id ? prod._id : undefined
        };
      });
    const filteredYantras = Object.entries(yantraQuantities)
      .filter(([k, v]) => v > 0)
      .map(([name, qty]) => {
        const yantra = yantraName.find(y => y.name === name);
        return {
          yantra_name: name,
          yantra_quantity: qty,
          _id: yantra && yantra._id ? yantra._id : undefined
        };
      });
    const productNameArr = filteredProducts.map(p => p.product_name);
    const productQtyArr = filteredProducts.map(p => p.product_quantity);
    const yantraNameArr = filteredYantras.map(y => y.yantra_name);
    const yantraQtyArr = filteredYantras.map(y => y.yantra_quantity);

    if (!selectedCase || filteredProducts.length === 0) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const selectedCaseItem = caseData.find(
      item => item.caseLabel === selectedCase
    )
    if (selectedCaseItem) {
      const { _id: caseID, client_id, executiveID } = selectedCaseItem
      const data = {
        clientID: client_id,
        CaseID: caseID,
        exeID: executiveID,
        productName: productNameArr,
        yantraName: yantraNameArr,
        product_quantity: productQtyArr,
        yantra_quantity: yantraQtyArr,
        products: filteredProducts,
        yantras: filteredYantras,
        priority,
        purchased: false
      }
      fetch('https://backend.piyushshivkumarshhri.com/api/addproduct/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          setselectedProductNames([])
          setSelectedYantraNames([])
          setCategoryName('')
          setPriority(false)
          toast.success('Product added successfully!');
        })
        .catch(error => {
          toast.error('Error saving product');
        })
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton
              defaultHref='#'
              className='back-button'
            ></IonBackButton>
          </IonButtons>
          {/* <IonTitle>Case</IonTitle> */}
          <IonButtons slot='end'>
            <IonImg src={logo} alt='App Logo' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className='ion-padding'
        style={{ backgroundColor: '#e2dee9' }}
      >
        <div style={{ paddingBottom: '10px' }}></div>
        {/* Accordion for Case Selection */}
        <div style={{ margin: '14px 0', background: 'white', borderRadius: '14px', padding: '10px' }}>
          <div
            style={{ cursor: 'pointer', fontWeight: 600, fontSize: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => setShowCaseDropdown(v => !v)}
          >
            <span>{selectedCase ? selectedCase : 'Choose Case'}</span>
            <span>{showCaseDropdown ? '▲' : '▼'}</span>
          </div>
          {showCaseDropdown && (
            <div style={{ maxHeight: 250, overflowY: 'auto', marginTop: 8, border: '1px solid #eee', borderRadius: 8, background: '#fafaff' }}>
              {/* Search bar for cases inside accordion */}
              <div style={{ padding: '8px 8px 0px 8px' }}>
                <input
                  type="text"
                  value={caseSearch}
                  onChange={e => setCaseSearch(e.target.value)}
                  placeholder="Search cases..."
                  style={{ width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc', background: '#fff' }}
                />
              </div>
              {/* Filtered case list */}
              {caseData.length === 0 && (
                <div style={{ padding: 12, color: '#888' }}>No cases found</div>
              )}
              {caseData.filter(item =>
                !debouncedCaseSearch || item.caseLabel.toLowerCase().includes(debouncedCaseSearch.toLowerCase())
              ).map((item, idx, arr) => (
                <div
                  key={item._id || idx}
                  style={{
                    padding: '12px 16px',
                    borderBottom: idx !== arr.length - 1 ? '1px solid #eee' : 'none',
                    background: selectedCase === item.caseLabel ? '#e2dee9' : 'transparent',
                    cursor: 'pointer',
                    fontWeight: selectedCase === item.caseLabel ? 700 : 400
                  }}
                  onClick={() => {
                    setShowCaseDropdown(false);
                    handleCaseSelection(item.caseLabel);
                    setCaseSearch("");
                  }}
                >
                  {item.caseLabel}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* End Accordion for Case Selection */}

        <div
          style={{
            paddingBottom: '10px',
            marginTop: '10px',
            paddingLeft: '10px'
          }}
        >
          {/* <IonLabel position="stacked">Product Name</IonLabel> */}
        </div>

        {/* <IonItem className="add-executive-item">
          <IonInput
            placeholder="Product Name"
            className="add-executive-input"
            name="ProductName"
            value={productName}
            onIonChange={(e) => setProductName(e.detail.value)}
          />
        </IonItem> */}
        {/* Product selection with quantity (Accordion) */}
        <div
          style={{
            marginTop: '16px',
            marginBottom: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: '#f6f6f6',
              padding: '12px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 600,
              fontSize: '16px'
            }}
            onClick={() => setShowProducts(prev => !prev)}
          >
            <span>Product name</span>
            <span>{showProducts ? '▲' : '▼'}</span>
          </div>
          {showProducts && (
            <div style={{ padding: '8px 0', height:'250px',overflowY: 'auto',backgroundColor: '#f6f6f6' }}>
              <div style={{padding: '0 16px 8px 16px'}}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  style={{width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc', backgroundColor: '#fff'}}
                />
              </div>
              {productName.filter(item => item.name.toLowerCase().includes(productSearch.toLowerCase())).map((item, idx) => (
                <IonItem
                  key={item.name}
                  className='add-executive-item-product'
                  style={{ alignItems: 'center' }}
                >
                  <IonLabel style={{ flex: 1 }}>{item.name}</IonLabel>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <button
                      onClick={() => handleProductQty(item.name, -1)}
                      style={{ width: 24, height: 24,backgroundColor:'red', color: 'white' }}
                      disabled={!productQuantities[item.name]}
                    >
                      -
                    </button>
                    <span>{productQuantities[item.name] || 0}</span>
                    <button
                      onClick={() => handleProductQty(item.name, 1)}
                      style={{ width: 24, height: 24,backgroundColor:'green', color: 'white' }}
                    >
                      +
                    </button>
                  </div>
                </IonItem>
              ))}
            </div>
          )}
        </div>

        {/* Yantra selection with quantity (Accordion) */}
        <div
          style={{
            marginTop: '16px',
            marginBottom: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              background: '#f6f6f6',
              padding: '12px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 600,
              fontSize: '16px'
            }}
            onClick={() => setShowYantras(prev => !prev)}
          >
            <span>Yantra name</span>
            <span>{showYantras ? '▲' : '▼'}</span>
          </div>
          {showYantras && (
            <div style={{ padding: '8px 0' , height:'200px',overflowY: 'auto',backgroundColor: '#f6f6f6'  }}>
              <div style={{padding: '0 16px 8px 16px'}}>
                <input
                  type="text"
                  placeholder="Search yantra..."
                  value={yantraSearch}
lonChange={e => setYantraSearch(e.target.value)}
                  style={{width: '100%', padding: '6px 8px', borderRadius: 4, border: '1px solid #ccc',backgroundColor: '#fff'
}}
                />
              </div>
              {yantraName.filter(item => item.name.toLowerCase().includes(yantraSearch.toLowerCase())).map((item, idx) => (
                <IonItem
                  key={item.name}
                  className='add-executive-item-product'
                  style={{  alignItems: 'center'  }}
                >
                  <IonLabel style={{ flex: 1 }}>{item.name}</IonLabel>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <button
                      onClick={() => handleYantraQty(item.name, -1)}
                      style={{ width: 24, height: 24, backgroundColor:'red', color: 'white' }}
                      disabled={!yantraQuantities[item.name]}
                    >
                      -
                    </button>
                    <span>{yantraQuantities[item.name] || 0}</span>
                    <button
                      onClick={() => handleYantraQty(item.name, 1)}
                      style={{ width: 24, height: 24, backgroundColor:'green', color: 'white'}}
                    >
                      +
                    </button>
                  </div>
                </IonItem>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            paddingBottom: '10px',
            marginTop: '10px',
            paddingLeft: '10px'
          }}
        >
          {/* <IonLabel position="stacked">Category Name</IonLabel> */}
        </div>

        {/* <IonItem className="add-executive-item">
          <IonInput
            placeholder="Category Name"
            className="add-executive-input"
            name="Category Name"
            value={categoryName}
            onIonChange={(e) => setCategoryName(e.detail.value)}
          />
        </IonItem> */}

        <IonItem className='add-executive-item'>
          <IonLabel>Priority</IonLabel>
          <IonCheckbox
            slot='start'
            checked={priority}
            onIonChange={e => setPriority(e.detail.checked)}
          />
        </IonItem>

        {error && (
          <div style={{ color: 'red', paddingBottom: '10px' }}>{error}</div>
        )}
        {successMessage && (
          <div style={{ color: 'green', paddingBottom: '10px' }}>
            {successMessage}
          </div>
        )}

        <div className='btn-div'

style={{
            zIndex: 1,
            margin :"10px 0px",
            justifyContent: "center" }}
        >
          <button className='add-executive-btn' onClick={handleSaveProduct}>
            Save Product
          </button>
        </div>
        <ToastContainer   position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </IonContent>
    </IonPage>
  )
}

export default AddProduct
