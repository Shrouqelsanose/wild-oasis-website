"use server";

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function updateGuest(formData) {
  const session = auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  const regexId = regex.test(nationalID);
  if (!regexId) throw new Error("Please provide a valid national ID");
  const updateData = { nationality, nationalID, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", (await session).user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}
export async function deleteReservation(bookingId) {
  const session = auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings((await session).user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId))
    throw new Error("Your aren't allowed to delete this booking");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings((await session).user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId))
    throw new Error("Your aren't allowed to update this booking");
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = auth();
  if (!session) throw new Error("You must be logged in");
  const newBooking = {
    ...bookingData,
    guestId: (await session).user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
    extrasPrice: bookingData.cabinPrice,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
