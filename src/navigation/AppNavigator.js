import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import LoginScreen from "../screens/Login/LoginScreen";
import AdminDashboard from "../screens/AdminDashboard";
import OwnerDashboard from "../screens/OwnerDashboard";
import TenantDashboard from "../screens/TenantDashboard";
import AirbnbGuestDashboard from "../screens/AirbnbGuestDashboard";
import ApartmentListScreen from "../screens/Apartment/ApartmentListScreen";
import PaymentListScreen from "../screens/Payments/PaymentListScreen";
import ResidentListScreen from "../screens/Residents/ResidentListScreen";
import EventListScreen from "../screens/Events/EventListScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer personalizado para cerrar sesión
function CustomDrawerContent({ navigation }) {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Cerrar sesión"
        onPress={() => navigation.replace("Login")}
      />
    </DrawerContentScrollView>
  );
}

// Drawer para cada dashboard según el rol
function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="AdminHome"
        component={AdminDashboard}
        options={{ title: "Panel Administrador" }}
      />
      <Drawer.Screen
        name="ApartmentList"
        component={ApartmentListScreen}
        options={{ title: "Apartamentos" }}
      />
       <Drawer.Screen
        name="PaymentList"
        component={PaymentListScreen}
        options={{ title: "Pagos" }}
      />
      <Drawer.Screen
      name="ResidentListScreen"
      component={ResidentListScreen}
      options={{ title: "Residentes" }}
      />
      <Drawer.Screen
      name="EventListScreen"
      component={EventListScreen}
      options={{ title: "Eventos" }}
      /> 
      {/* Puedes añadir más pantallas aquí */}
    </Drawer.Navigator>
  );
}

function OwnerDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="OwnerDashboard"
        component={OwnerDashboard}
        options={{ title: "Panel Propietario" }}
      />
    </Drawer.Navigator>
  );
}
function TenantDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="TenantDashboard"
        component={TenantDashboard}
        options={{ title: "Panel Arrendatario" }}
      />
    </Drawer.Navigator>
  );
}
function AirbnbDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="AirbnbGuestDashboard"
        component={AirbnbGuestDashboard}
        options={{ title: "Panel Airbnb" }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
        <Stack.Screen name="OwnerDashboard" component={OwnerDrawer} />
        <Stack.Screen name="TenantDashboard" component={TenantDrawer} />
        <Stack.Screen name="AirbnbGuestDashboard" component={AirbnbDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
