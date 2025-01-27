import { IconShoppingCart , IconSearch } from "@tabler/icons-react";

export default function Header() {
    return (
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-120">
          <div><h1 className="text-xl font-bold text-gray-800">ECOMMERCE</h1></div>
          <div><nav className="flex space-x-4 text-sm font-medium">
            <a href="#" className="hover:underline text-gray-800">
              Categories
            </a>
            <a href="#" className="hover:underline text-gray-800">
              Sale
            </a>
            <a href="#" className="hover:underline text-gray-800">
              Clearance
            </a>
            <a href="#" className="hover:underline text-gray-800">
              New stock
            </a>
            <a href="#" className="hover:underline text-gray-800">
              Trending
            </a>
          </nav></div>
          <div className="flex space-x-4">
            <IconShoppingCart color="gray"/>
            <IconSearch color="gray" />
          </div>
          
        </div>
      </header>
    );
  }
  