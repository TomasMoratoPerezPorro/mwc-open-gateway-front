export interface Festival {
  festival_id: number;
  festival_name: string;
}

export interface Role {
  role_id: number;
  role_name: string;
}

export interface RouteStatus {
  status_id: number;
  status_name: string;
}

export interface User {
  user_id: number;
  username: string;
  password_hash?: string;
  email: string;
  phone_number: string;
  role_id: number;
  festival_id: number;
  last_location_time?: Date;
  last_location_coordinates?: string; // Format as 'latitude,longitude' if using POINT
}

export interface Vehicle {
  vehicle_id: number;
  registration_number: string;
  rental_company: string;
  main_driver_id: number;
  brand: string;
  festival_id: number;
}

export interface Route {
  route_id: number;
  start_coordinates_latitude: number;
  start_coordinates_longitude: number;
  end_coordinates_latitude: number;
  end_coordinates_longitude: number;
  pickup_time: Date;
  drop_time: Date;
  status_id: number;
  driver_id: number;
  vip_id: number;
  vehicle_id: number;
  festival_id: number;
}

export interface UserRoute {
  user_route_id: number;
  user_id: number;
  route_id: number;
  festival_id: number;
}
