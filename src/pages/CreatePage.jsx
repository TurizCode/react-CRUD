import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreatePage = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price || !image) {
      alert("Please fill all the froms");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${VITE_BACKEND_URL}/api/products/`, {
        name: name,
        quantity: quantity,
        price: price,
        image: image,
      });
      toast.success(response.data.name + " created successfully");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-xl mb-4 block text-center">
        Create a Product
      </h2>
      <form onSubmit={saveProduct}>
        <div className="space-y-2">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400"
              placeholder="Product Name"
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400"
              placeholder="Product Quantity"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400"
              placeholder="Product Price"
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-500 placeholder-gray-400"
              placeholder="Product Image URL"
            />
          </div>
          <div>
            {!isLoading && (
              <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Product
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;