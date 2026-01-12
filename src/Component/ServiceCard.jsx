import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Bike, PackageCheck, Warehouse, Truck, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const services = [
    {
      id: "01",
      title: "Bike Service",
      icon: <Bike size={40} aria-hidden="true" />,
      desc: "Fast and reliable bike delivery services for local and hyperlocal shipments, ensuring same-day and express movement of documents and small parcels.",
      link: "/services/Bike-service",
    },
    {
      id: "02",
      title: "Express Parcel",
      icon: <PackageCheck size={40} aria-hidden="true" />,
      desc: "Time-definite express parcel services designed for urgent deliveries with real-time tracking and secure handling across cities.",
      link: "/services/express",
    },
    {
      id: "03",
      title: "Warehousing",
      icon: <Warehouse size={40} aria-hidden="true" />,
      desc: "Secure and scalable warehousing solutions with organized storage, inventory management, and faster order fulfillment support.",
      link: "/services/warehousing",
    },
    {
      id: "04",
      title: "Full Truckload",
      icon: <Truck size={40} aria-hidden="true" />,
      desc: "Dedicated full truckload transportation for large consignments, offering cost efficiency, safety, and timely nationwide deliveries.",
      link: "/services/full-truck",
      active: true,
    },
  ];

  return (
    <section
      className="py-24 bg-white font-sans overflow-hidden"
      aria-labelledby="localmate-services-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div data-aos="fade-right">
            <p className="text-red-600 font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-red-600"></span>
              Localmate Logistics Services
            </p>
            <h2
              id="localmate-services-heading"
              className="text-4xl md:text-5xl font-black text-slate-900   uppercase"
            >
              Our Core <span className="text-red-600">Services</span>
            </h2>
          </div>

          <p
            data-aos="fade-left"
            className="text-gray-500 max-w-md border-l-2 border-gray-200 pl-6 leading-relaxed"
          >
            Localmate delivers end-to-end logistics and supply chain solutions
            that help businesses improve delivery speed, reduce costs, and scale
            operations efficiently.
          </p>
        </header>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-100">
          {services.map((service, index) => (
            <article
              key={service.id}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className={`relative group p-10 border-r border-b border-gray-200 transition-all duration-500 cursor-pointer overflow-hidden ${
                service.active
                  ? "bg-slate-900 text-white"
                  : "hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="absolute top-0 left-0 w-full h-0 bg-red-600 transition-all duration-500 group-hover:h-1"></div>

              <span
                className={`absolute top-0 right-0 font-black text-2xl   opacity-20 ${
                  service.active
                    ? "text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {service.id}
              </span>

              <div
                className={`mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                  service.active
                    ? "text-red-500"
                    : "text-red-600 group-hover:text-red-500"
                }`}
              >
                {service.icon}
              </div>

              <h3 className="text-xl font-black uppercase   mb-4 tracking-tighter">
                {service.title}
              </h3>

              <p
                className={`text-sm leading-relaxed mb-8 ${
                  service.active
                    ? "text-gray-300"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
              >
                {service.desc}
              </p>

              <Link
                to={service.link}
                className="flex items-center gap-2 text-xs  font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hover:text-red-500"
              >
                Learn More <MoveRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
