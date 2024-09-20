import React, { useState } from 'react';

const BillForm = () => {
  const [partyData, setPartyData] = useState({
    gstin: '',
    legal_name: '',
    trade_name: '',
    principal_address: { address1: '', address2: '', city: '', state: '', country: '', pincode: '' },
    shipping_address: { address1: '', address2: '', city: '', state: '', country: '', pincode: '' },
  });

  const [hsnDetails, setHsnDetails] = useState([{ hsn: '', product_info: '', cgst: '', sgst: '', igst: '' }]);
  const [quantities, setQuantities] = useState(['']);
  const [rates, setRates] = useState(['']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartyData({ ...partyData, [name]: value });
  };

  const handleAddressChange = (type, field, value) => {
    setPartyData(prevState => ({
      ...prevState,
      [type]: { ...prevState[type], [field]: value }
    }));
  };

  const handleHSNChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHsn = [...hsnDetails];
    updatedHsn[index][name] = value;
    setHsnDetails(updatedHsn);
  };

  const handleQuantityChange = (index, e) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = e.target.value;
    setQuantities(updatedQuantities);
  };

  const handleRateChange = (index, e) => {
    const updatedRates = [...rates];
    updatedRates[index] = e.target.value;
    setRates(updatedRates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      party: partyData,
      quantities: quantities,
      hsn_details: hsnDetails,
      rates: rates,
    };

    try {
      const response = await fetch('https://amigo-softcom-assignment-2.onrender.com/generate-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const result = await response.json();
        console.log('Bill generated:', result);
        setSuccessMessage('Bill generated successfully.');
        setError('');
        setDownloadLink(`https://amigo-softcom-assignment-2.onrender.com/${result.filePath}`);
      } else {
        const result = await response.text();
        console.log('Unexpected response:', result);
        setError('Unexpected response from server. Please try again.');
        setSuccessMessage('');
      }

    } catch (error) {
      console.error('Error generating bill:', error);
      setError('Failed to generate the bill.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full opacity-40 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-teal-400 to-green-400 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="relative bg-white bg-opacity-40 border border-gray-300 shadow-2xl rounded-3xl p-12 w-full max-w-4xl transform hover:scale-105 hover:bg-opacity-50 transition duration-500 ease-in-out z-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Billing Information</h1>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Party Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="gstin"
                value={partyData.gstin}
                onChange={handleInputChange}
                placeholder="GSTIN"
                className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
              />
              <input
                type="text"
                name="legal_name"
                value={partyData.legal_name}
                onChange={handleInputChange}
                placeholder="Legal Name"
                className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
              />
              <input
                type="text"
                name="trade_name"
                value={partyData.trade_name}
                onChange={handleInputChange}
                placeholder="Trade Name"
                className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Principal Address</h2>
            <input
              type="text"
              value={partyData.principal_address.address1}
              onChange={(e) => handleAddressChange('principal_address', 'address1', e.target.value)}
              placeholder="Address Line 1"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.principal_address.address2}
              onChange={(e) => handleAddressChange('principal_address', 'address2', e.target.value)}
              placeholder="Address Line 2"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.principal_address.city}
              onChange={(e) => handleAddressChange('principal_address', 'city', e.target.value)}
              placeholder="City"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.principal_address.state}
              onChange={(e) => handleAddressChange('principal_address', 'state', e.target.value)}
              placeholder="State"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.principal_address.country}
              onChange={(e) => handleAddressChange('principal_address', 'country', e.target.value)}
              placeholder="Country"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.principal_address.pincode}
              onChange={(e) => handleAddressChange('principal_address', 'pincode', e.target.value)}
              placeholder="Pincode"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Shipping Address</h2>
            <input
              type="text"
              value={partyData.shipping_address.address1}
              onChange={(e) => handleAddressChange('shipping_address', 'address1', e.target.value)}
              placeholder="Address Line 1"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.shipping_address.address2}
              onChange={(e) => handleAddressChange('shipping_address', 'address2', e.target.value)}
              placeholder="Address Line 2"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.shipping_address.city}
              onChange={(e) => handleAddressChange('shipping_address', 'city', e.target.value)}
              placeholder="City"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.shipping_address.state}
              onChange={(e) => handleAddressChange('shipping_address', 'state', e.target.value)}
              placeholder="State"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.shipping_address.country}
              onChange={(e) => handleAddressChange('shipping_address', 'country', e.target.value)}
              placeholder="Country"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
            <input
              type="text"
              value={partyData.shipping_address.pincode}
              onChange={(e) => handleAddressChange('shipping_address', 'pincode', e.target.value)}
              placeholder="Pincode"
              className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">HSN Details</h2>
            {hsnDetails.map((hsnDetail, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <input
                  type="text"
                  name="hsn"
                  value={hsnDetail.hsn}
                  onChange={(e) => handleHSNChange(index, e)}
                  placeholder="HSN Code"
                  className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
                />
                <input
                  type="text"
                  name="product_info"
                  value={hsnDetail.product_info}
                  onChange={(e) => handleHSNChange(index, e)}
                  placeholder="Product Info"
                  className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
                />
                <input
                  type="text"
                  name="cgst"
                  value={hsnDetail.cgst}
                  onChange={(e) => handleHSNChange(index, e)}
                  placeholder="CGST"
                  className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
                />
                <input
                  type="text"
                  name="sgst"
                  value={hsnDetail.sgst}
                  onChange={(e) => handleHSNChange(index, e)}
                  placeholder="SGST"
                  className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
                />
                <input
                  type="text"
                  name="igst"
                  value={hsnDetail.igst}
                  onChange={(e) => handleHSNChange(index, e)}
                  placeholder="IGST"
                  className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setHsnDetails([...hsnDetails, { hsn: '', product_info: '', cgst: '', sgst: '', igst: '' }])}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Add HSN Detail
            </button>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Quantity and Rate</h2>
            {quantities.map((quantity, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(index, e)}
                  placeholder="Quantity"
                  className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
                />
                <input
                  type="text"
                  value={rates[index]}
                  onChange={(e) => handleRateChange(index, e)}
                  placeholder="Rate"
                  className="bg-white bg-opacity-60 border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400 shadow-lg text-gray-700 placeholder-gray-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setQuantities([...quantities, '']);
                setRates([...rates, '']);
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Add Item
            </button>
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-4 px-8 rounded-lg shadow-lg w-full text-xl font-bold hover:bg-green-600 transition duration-300"
            >
              Generate Bill
            </button>
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>}
          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
          {downloadLink && (
            <p className="text-center">
              <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Download Generated Bill
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BillForm;
