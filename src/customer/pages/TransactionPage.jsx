import React, { useEffect, useState } from 'react'
import NavbarBarber from '../components/NavbarBarber'
import useAxios from '../../hooks/useAxios';
import SideBarTransaction from '../components/transaction/Sidebartransaction';
import TransactionItem from '../components/transaction/TransactionItem';
import { FooterPage } from './FooterPage';

const TransactionPage = () => {
    const response_data = {
        "statusCode": 200,
        "message": "Data retrieved successfully",
        "data": [
          {
            "booking_id": "BKG12345",
            "customer": {
              "id": "CUST001",
              "firstName": "John",
              "surname": "Doe",
              "email": "john.doe@example.com",
              "phone": "+1234567890",
              "address": "123 Elm Street, Springfield",
              "about": "Loyal customer",
              "is_male": true,
              "date_of_birth": 631152000
            },
            "barber": {
              "id": "BRB001",
              "name": "Barber A",
              "contact_number": "+9876543210",
              "email": "barber.a@example.com",
              "street_address": "456 Oak Street",
              "city": "Springfield",
              "state_province_region": "IL",
              "postal_zip_code": "62704",
              "country": "USA",
              "latitude": 39.7817,
              "longitude": -89.6501,
              "description": "Expert in fades and classic cuts",
              "balance": 150.00,
              "verified": true,
              "barbershop_profile_picture_id": {
                "id": "PIC001",
                "name": "profile_pic.jpg",
                "path": "/images/profile_pic.jpg",
                "size": 2048,
                "contentType": "image/jpeg",
                "createdAt": 1693771200,
                "updatedAt": 1693771200
              },
              "operational_hours": [
                {
                  "operating_hours_id": "OPH001",
                  "barbershop_id": "BRB001",
                  "day": "Monday",
                  "opening_time": "09:00 AM",
                  "closing_time": "05:00 PM"
                }
              ],
              "services": [
                {
                  "service_id": "SRV001",
                  "service_name": "Haircut",
                  "price": 25.00
                }
              ],
              "social_media": [
                {
                  "social_media_id": "SOC001",
                  "platform_name": "Instagram",
                  "platform_url": "https://instagram.com/barber_a"
                }
              ],
              "createdAt": 1693771200,
              "updateAt": 1693771200,
              "average_rating": 4.8,
              "review_count": 120
            },
            "services": [
              {
                "service_id": "SRV001",
                "service_name": "Haircut",
                "price": 25.00
              }
            ],
            "bookingDate": 1693774800,
            "bookingTime": "10:00 AM",
            "status": "Confirmed",
            "totalPrice": 25.00,
            "createdAt": 1693771200,
            "updatedAt": 1693771200
          },
          {
            "booking_id": "BKG12346",
            "customer": {
              "id": "CUST002",
              "firstName": "Jane",
              "surname": "Smith",
              "email": "jane.smith@example.com",
              "phone": "+1234567891",
              "address": "789 Pine Street, Springfield",
              "about": "Prefers short styles",
              "is_male": false,
              "date_of_birth": 662688000
            },
            "barber": {
              "id": "BRB002",
              "name": "Barber B",
              "contact_number": "+9876543211",
              "email": "barber.b@example.com",
              "street_address": "123 Cedar Avenue",
              "city": "Springfield",
              "state_province_region": "IL",
              "postal_zip_code": "62705",
              "country": "USA",
              "latitude": 39.7990,
              "longitude": -89.6437,
              "description": "Specializes in modern styles",
              "balance": 200.00,
              "verified": true,
              "barbershop_profile_picture_id": {
                "id": "PIC002",
                "name": "profile_pic_b.jpg",
                "path": "/images/profile_pic_b.jpg",
                "size": 2048,
                "contentType": "image/jpeg",
                "createdAt": 1693771200,
                "updatedAt": 1693771200
              },
              "operational_hours": [
                {
                  "operating_hours_id": "OPH002",
                  "barbershop_id": "BRB002",
                  "day": "Tuesday",
                  "opening_time": "10:00 AM",
                  "closing_time": "06:00 PM"
                }
              ],
              "services": [
                {
                  "service_id": "SRV002",
                  "service_name": "Shave",
                  "price": 15.00
                }
              ],
              "social_media": [
                {
                  "social_media_id": "SOC002",
                  "platform_name": "Facebook",
                  "platform_url": "https://facebook.com/barber_b"
                }
              ],
              "createdAt": 1693771200,
              "updateAt": 1693771200,
              "average_rating": 4.5,
              "review_count": 100
            },
            "services": [
              {
                "service_id": "SRV002",
                "service_name": "Shave",
                "price": 15.00
              }
            ],
            "bookingDate": 1693782000,
            "bookingTime": "11:00 AM",
            "status": "Completed",
            "totalPrice": 15.00,
            "createdAt": 1693771200,
            "updatedAt": 1693771200
          },
          {
            "booking_id": "BKG12347",
            "customer": {
              "id": "CUST003",
              "firstName": "Sam",
              "surname": "Wilson",
              "email": "sam.wilson@example.com",
              "phone": "+1234567892",
              "address": "456 Birch Road, Springfield",
              "about": "Frequent customer",
              "is_male": true,
              "date_of_birth": 694224000
            },
            "barber": {
              "id": "BRB003",
              "name": "Barber C",
              "contact_number": "+9876543212",
              "email": "barber.c@example.com",
              "street_address": "789 Willow Lane",
              "city": "Springfield",
              "state_province_region": "IL",
              "postal_zip_code": "62706",
              "country": "USA",
              "latitude": 39.8007,
              "longitude": -89.6527,
              "description": "Known for creative cuts",
              "balance": 250.00,
              "verified": true,
              "barbershop_profile_picture_id": {
                "id": "PIC003",
                "name": "profile_pic_c.jpg",
                "path": "/images/profile_pic_c.jpg",
                "size": 2048,
                "contentType": "image/jpeg",
                "createdAt": 1693771200,
                "updatedAt": 1693771200
              },
              "operational_hours": [
                {
                  "operating_hours_id": "OPH003",
                  "barbershop_id": "BRB003",
                  "day": "Wednesday",
                  "opening_time": "11:00 AM",
                  "closing_time": "07:00 PM"
                }
              ],
              "services": [
                {
                  "service_id": "SRV003",
                  "service_name": "Beard Trim",
                  "price": 10.00
                }
              ],
              "social_media": [
                {
                  "social_media_id": "SOC003",
                  "platform_name": "Twitter",
                  "platform_url": "https://twitter.com/barber_c"
                }
              ],
              "createdAt": 1693771200,
              "updateAt": 1693771200,
              "average_rating": 4.7,
              "review_count": 80
            },
            "services": [
              {
                "service_id": "SRV003",
                "service_name": "Beard Trim",
                "price": 10.00
              }
            ],
            "bookingDate": 1693789200,
            "bookingTime": "01:00 PM",
            "status": "settlement",
            "totalPrice": 10.00,
            "createdAt": 1693771200,
            "updatedAt": 1693771200
          },
          {
            "booking_id": "BKG12348",
            "customer": {
              "id": "CUST004",
              "firstName": "Emily",
              "surname": "Johnson",
              "email": "emily.johnson@example.com",
              "phone": "+1234567893",
              "address": "789 Maple Drive, Springfield",
              "about": "Loves trendy styles",
              "is_male": false,
              "date_of_birth": 725760000
            },
            "barber": {
              "id": "BRB004",
              "name": "Barber D",
              "contact_number": "+9876543213",
              "email": "barber.d@example.com",
              "street_address": "123 Pine Crescent",
              "city": "Springfield",
              "state_province_region": "IL",
              "postal_zip_code": "62707",
              "country": "USA",
              "latitude": 39.8022,
              "longitude": -89.6554,
              "description": "Expert in curly hair",
              "balance": 300.00,
              "verified": true,
              "barbershop_profile_picture_id": {
                "id": "PIC004",
                "name": "profile_pic_d.jpg",
                "path": "/images/profile_pic_d.jpg",
                "size": 2048,
                "contentType": "image/jpeg",
                "createdAt": 1693771200,
                "updatedAt": 1693771200
              },
              "operational_hours": [
                {
                  "operating_hours_id": "OPH004",
                  "barbershop_id": "BRB004",
                  "day": "Thursday",
                  "opening_time": "08:00 AM",
                  "closing_time": "04:00 PM"
                }
              ],
              "services": [
                {
                  "service_id": "SRV004",
                  "service_name": "Coloring",
                  "price": 50.00
                }
              ],
              "social_media": [
                {
                  "social_media_id": "SOC004",
                  "platform_name": "LinkedIn",
                  "platform_url": "https://linkedin.com/in/barber_d"
                }
              ],
              "createdAt": 1693771200,
              "updateAt": 1693771200,
              "average_rating": 4.9,
              "review_count": 150
            },
            "services": [
              {
                "service_id": "SRV004",
                "service_name": "Coloring",
                "price": 50.00
              }
            ],
            "bookingDate": 1693796400,
            "bookingTime": "02:00 PM",
            "status": "Cancelled",
            "totalPrice": 50.00,
            "createdAt": 1693771200,
            "updatedAt": 1693771200
          },
          {
            "booking_id": "BKG12349",
            "customer": {
              "id": "CUST005",
              "firstName": "Michael",
              "surname": "Brown",
              "email": "michael.brown@example.com",
              "phone": "+1234567894",
              "address": "456 Oak Lane, Springfield",
              "about": "New customer",
              "is_male": true,
              "date_of_birth": 757296000
            },
            "barber": {
              "id": "BRB005",
              "name": "Barber E",
              "contact_number": "+9876543214",
              "email": "barber.e@example.com",
              "street_address": "789 Ash Road",
              "city": "Springfield",
              "state_province_region": "IL",
              "postal_zip_code": "62708",
              "country": "USA",
              "latitude": 39.8037,
              "longitude": -89.6580,
              "description": "Specialist in straight razor shaves",
              "balance": 350.00,
              "verified": true,
              "barbershop_profile_picture_id": {
                "id": "PIC005",
                "name": "profile_pic_e.jpg",
                "path": "/images/profile_pic_e.jpg",
                "size": 2048,
                "contentType": "image/jpeg",
                "createdAt": 1693771200,
                "updatedAt": 1693771200
              },
              "operational_hours": [
                {
                  "operating_hours_id": "OPH005",
                  "barbershop_id": "BRB005",
                  "day": "Friday",
                  "opening_time": "09:00 AM",
                  "closing_time": "06:00 PM"
                }
              ],
              "services": [
                {
                  "service_id": "SRV005",
                  "service_name": "Straight Razor Shave",
                  "price": 30.00
                }
              ],
              "social_media": [
                {
                  "social_media_id": "SOC005",
                  "platform_name": "YouTube",
                  "platform_url": "https://youtube.com/barber_e"
                }
              ],
              "createdAt": 1693771200,
              "updateAt": 1693771200,
              "average_rating": 4.6,
              "review_count": 60
            },
            "services": [
              {
                "service_id": "SRV005",
                "service_name": "Straight Razor Shave",
                "price": 30.00
              }
            ],
            "bookingDate": 1693803600,
            "bookingTime": "03:00 PM",
            "status": "pending",
            "totalPrice": 30.00,
            "createdAt": 1693771200,
            "updatedAt": 1693771200
          }
        ]
      };

      const [transactions, setTransactions] = useState([]);
      const { response, error, loading, request } = useAxios();
      const [status, setStatus] = useState("all");
      const [filteredData, setFilteredData] = useState([]);

      const fetchData = async () => {
        try {
          const res = await request('/bookings/current');
          console.log(res)
          setTransactions(res.data);
        } catch (error) {
          console.log(error);
        }
      }

      useEffect(() => {
        fetchData();
      }, [])


      useEffect(() => {
        const filtered = transactions.filter((transaction) => {
          switch (status.toLowerCase()) {
            case "all":
              return true;
            case "settlement":
              return transaction.status.toLowerCase() === "settlement";
            case "pending":
              return transaction.status.toLowerCase() === "pending";
            case "cancelled":
              return transaction.status.toLowerCase() === "cancelled";
            case "completed":
              return transaction.status.toLowerCase() === "completed";
            default:
              return false;
          }
        });
      
        const sorted = filtered.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
      
        setFilteredData(sorted);
      }, [status, transactions]);


      
  return (
    <>
        <NavbarBarber />
        <main className="max-w-screen-xl mx-auto pt-32 flex min-h-[40rem]">
            <div className="w-60 fixed">
                <SideBarTransaction status={status} setStatus={setStatus} />
            </div>

            <div className="flex-1 ml-60">
                <TransactionItem data={filteredData} />
            </div>
        </main>


      <FooterPage />
    </>
  )
}

export default TransactionPage