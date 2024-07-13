import { auth, db } from "@/lib/firebase";
import { loginSchema, registerSchema } from "@/lib/schemas";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";

export const authenticateUser = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    return { success: "Signed in successfully!" };
  } catch {
    return { error: "Invalid credentials!" };
  }
};

export const createUser = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        name,
        email,
        uid: user.uid,
      },
      { merge: true }
    );

    return { success: "User created successfully!" };
  } catch {
    return { error: "Failed to create user!" };
  }
};

export async function signOut() {
  try {
    await auth.signOut();
    return { success: "Signed out!" };
  } catch {
    return { error: "Server error!" };
  }
}
