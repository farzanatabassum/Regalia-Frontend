import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductItem = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [key, setKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      const authtoken = localStorage.getItem('Token');
      if (authtoken) {
        setUser(authtoken);
        setKey(Math.random());
      }

      {
        !user &&
          fetch('http://localhost:5000/api/products/listAll', {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((parsed) => {
              setProducts(parsed);
              setIsLoading(false);
            });
      }
      {
        user &&
          fetch('http://localhost:5000/api/recommendations/getPreference', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authtoken}`,
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((parsed) => {
              setProducts(parsed);
              setIsLoading(false);
              setKey(Math.random());
            });
      }
    } catch (error) {
      console.log(error);
    }
  }, [router, user]);
  return (
    <div>
      <section className="py-10 px-12">
        {!user ? (
          <h3 className="text-left text-2xl font-semibold mb-3">
            Latest Collections
          </h3>
        ) : (
          <h3 className="text-left text-2xl font-semibold mb-3">
            Recommended Products
          </h3>
        )}
        {isLoading && <div>Loading... </div>}
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            return (
              <Link href={`/product/${product._id}`} key={product._id}>
                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <img
                    className="rounded-t-lg object-contain object-center h-[56vh] w-full"
                    src={product.image}
                    alt="cloth image"
                  />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.brand}
                    </h5>
                    <h5 className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-bold">Category:</span>{' '}
                      {product.category}
                    </h5>
                    <h5 className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-bold">Size:</span> {product.size}
                    </h5>
                    <h5 className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-bold">Price:</span>{' '}
                      Tk {product.sellingPrice}
                    </h5>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductItem;
