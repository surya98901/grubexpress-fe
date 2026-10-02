
const AdminResBanner = ()=>{
    return (
         <section className="relative min-h-[300px] overflow-hidden rounded-2xl bg-green-700 p-6 shadow-md">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/5" />

            <div className="relative z-10">
              <p className="mb-1 text-sm font-medium text-green-100">
                Restaurant overview
              </p>

              <h2 className="text-2xl font-bold text-white">
                Today's Dashboard
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-green-100">
                Keep track of orders, reservations and delivery activity from
                one place.
              </p>

              {/* Overview stats */}

              <div className="mt-8 grid grid-cols-2 gap-3">
                {/* Orders */}

                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-green-100">Total Orders</p>

                  <p className="mt-1 text-2xl font-bold text-white">0</p>
                </div>

                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-green-100">Reservations</p>

                  <p className="mt-1 text-2xl font-bold text-white">0</p>
                </div>

                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-green-100">Revenue</p>

                  <p className="mt-1 text-2xl font-bold text-white">₹0</p>
                </div>

                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs text-green-100">Customers</p>

                  <p className="mt-1 text-2xl font-bold text-white">0</p>
                </div>
              </div>
            </div>
          </section>
    )
}
export default AdminResBanner