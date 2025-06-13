import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { getStoredData, setStoredData } from '../utils/storage';

const PackingList = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('essential');

  const defaultItems = {
    essential: [
      'passport', 'visa', 'tickets', 'insurance', 'medications', 'phone', 'charger', 'camera'
    ],
    clothing: [
      'underwear', 'socks', 'shirts', 'pants', 'jacket', 'shoes', 'pajamas', 'swimwear'
    ],
    personal: [
      'toothbrush', 'toothpaste', 'shampoo', 'soap', 'sunscreen', 'glasses', 'contacts'
    ],
    family: [
      'diapers', 'baby_food', 'toys', 'stroller', 'car_seat', 'first_aid', 'snacks'
    ]
  };

  useEffect(() => {
    const storedItems = getStoredData('packingList');
    if (storedItems && storedItems.length > 0) {
      setItems(storedItems);
    } else {
      // Initialize with default items
      const initialItems = [];
      Object.entries(defaultItems).forEach(([cat, itemList]) => {
        itemList.forEach(item => {
          initialItems.push({
            id: Date.now() + Math.random(),
            name: item,
            category: cat,
            checked: false,
            isDefault: true
          });
        });
      });
      setItems(initialItems);
    }
  }, []);

  useEffect(() => {
    setStoredData('packingList', items);
  }, [items]);

  const addItem = () => {
    if (newItem.trim()) {
      const item = {
        id: Date.now(),
        name: newItem.trim(),
        category,
        checked: false,
        isDefault: false
      };
      setItems([...items, item]);
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const resetList = () => {
    if (confirm(t('confirmReset'))) {
      const initialItems = [];
      Object.entries(defaultItems).forEach(([cat, itemList]) => {
        itemList.forEach(item => {
          initialItems.push({
            id: Date.now() + Math.random(),
            name: item,
            category: cat,
            checked: false,
            isDefault: true
          });
        });
      });
      setItems(initialItems);
    }
  };

  const getItemsByCategory = (cat) => {
    return items.filter(item => item.category === cat);
  };

  const getProgress = () => {
    const checkedItems = items.filter(item => item.checked).length;
    return items.length > 0 ? Math.round((checkedItems / items.length) * 100) : 0;
  };

  const categories = [
    { key: 'essential', icon: '⭐' },
    { key: 'clothing', icon: '👕' },
    { key: 'personal', icon: '🧴' },
    { key: 'family', icon: '👨‍👩‍👧‍👦' }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('packingList')}</h2>
        <button
          onClick={resetList}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {t('reset')}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{t('progress')}</span>
          <span className="text-sm text-gray-500">{getProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Add New Item */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder={t('addNewItem')}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.key} value={cat.key}>
                {t(cat.key)}
              </option>
            ))}
          </select>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('add')}
          </button>
        </div>
      </div>

      {/* Items by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.key} className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <span className="mr-2 text-xl">{cat.icon}</span>
              {t(cat.key)}
              <span className="ml-2 text-sm text-gray-500">
                ({getItemsByCategory(cat.key).filter(item => item.checked).length}/{getItemsByCategory(cat.key).length})
              </span>
            </h3>
            <div className="space-y-2">
              {getItemsByCategory(cat.key).map(item => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-2 rounded ${
                    item.checked ? 'bg-green-100' : 'bg-white'
                  }`}
                >
                  <label className="flex items-center cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(item.id)}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className={`${item.checked ? 'line-through text-gray-500' : ''}`}>
                      {item.isDefault ? t(item.name) : item.name}
                    </span>
                  </label>
                  {!item.isDefault && (
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackingList;
