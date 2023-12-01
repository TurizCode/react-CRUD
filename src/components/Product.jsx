import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";

const Product = ({ product, getProducts }) => {
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete '${product.name}'?`,
      text: "You won't be able to redo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted.",
          icon: "success",
        });
        try {
          await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`);
          toast.success("Product deleted successfully");
          getProducts();
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  return (
    <div className="bg-white rounded shadow-xl overflow-hidden">
      <img
        src={product.image}
        alt="Product Image"
        className="w-full h-48 object-cover"
      />
      <div className="px-4 pt-2 pb-4">
        <h2 className="text-lg uppercase font-semibold">{product.name}</h2>
        <div className="text-sm">Quantity: {product.quantity}</div>
        <p className="text-sm">Price: ${product.price}</p>
      </div>
      <div className="mt-2">
        <Link to={`/edit/${product._id}`}>
          <button
            type="button"
            className="inline-block w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          >
            Edit
          </button>
        </Link>
        <button
          type="button"
          onClick={() => deleteProduct(product._id)}
          className="inline-block w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Product;
