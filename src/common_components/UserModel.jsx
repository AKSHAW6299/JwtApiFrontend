import React, { useEffect, useState } from "react";

const UserModal = ({ user, onClose, onSave, isEdit }) => {
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Profile" : "User Details"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 pb-4 border-b border-gray-50">
            <img src={user.image} alt={user.firstName} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-50" />
            <div>
              <p className="text-lg font-bold text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-500">ID: #{user.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4">
            <InputGroup 
              label="Email Address" 
              name="email" 
              value={formData.email} 
              isEdit={isEdit} 
              onChange={handleChange} 
            />
            <InputGroup 
              label="Phone Number" 
              name="phone" 
              value={formData.phone} 
              isEdit={isEdit} 
              onChange={handleChange} 
            />
            <InputGroup 
              label="Professional Role" 
              name="role" 
              value={formData.role || "N/A"} 
              isEdit={isEdit} 
              onChange={handleChange} 
            />
            
            <div className="space-y-1">
              <label className="text-xs font-uppercase font-bold text-gray-400 tracking-wider">Location</label>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                {user.address?.address}, {user.address?.city}, {user.address?.state}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          {isEdit && (
            <button
              onClick={() => onSave(formData)}
              className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component for the Modal
const InputGroup = ({ label, name, value, isEdit, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</label>
    {isEdit ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-sm"
      />
    ) : (
      <p className="text-gray-700 text-sm font-medium px-1">{value}</p>
    )}
  </div>
);

export default UserModal;