import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Inicia sesión para ver tus favoritos
          </h2>
          <p className="text-gray-600 mb-8">
            Necesitas una cuenta para guardar tus productos favoritos
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir al Inicio
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Mis Favoritos
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            {favorites.length > 0 
              ? `Tienes ${favorites.length} producto${favorites.length === 1 ? '' : 's'} guardado${favorites.length === 1 ? '' : 's'}`
              : 'Aún no tienes productos favoritos'
            }
          </p>
        </motion.div>

        {favorites.length > 0 ? (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={favorite.product.image}
                      alt={favorite.product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full capitalize">
                        {favorite.product.category}
                      </span>
                    </div>

                    {/* Remove from favorites */}
                    <button
                      onClick={() => removeFromFavorites(favorite.product.id)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {favorite.product.description}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {favorite.product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${favorite.product.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => addToCart(favorite.product)}
                        disabled={favorite.product.stock === 0}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          favorite.product.stock === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>
                          {favorite.product.stock === 0 ? 'Agotado' : 'Agregar'}
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">💝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Tu lista de favoritos está vacía
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explora nuestros productos y agrega los que más te gusten a tu lista de favoritos
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Explorar Productos
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}