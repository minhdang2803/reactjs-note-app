import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initFirebase } from './services/FirebaseServices';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

// Screens
import { OnboardingView } from './features/OnboardingScreen/OnboardingScreen';
import RegisterView from './features/RegisterScreen/RegisterScreen';
import LoginView from './features/LoginScreen/LoginScreen';
import HomeScreen from './features/HomeScreen/HomeScreen';

// New Wrappers
import ProtectedRoute from './components/ProtectedRoute'; // Adjust path
import PublicRoute from './components/PublicRoute';       // Adjust path
import NoteView from './features/NoteScreen/NoteScreen';

// Initialize Firebase OUTSIDE component to prevent double init during re-renders
initFirebase();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Only set loading to false after we get the first response
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-primary-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-primary-light flex justify-center">
      <div className="w-full max-w-[812px] min-h-screen">
        <Routes>
        {/* --- Public Routes (Restricted for logged-in users) --- */}
        <Route element={<PublicRoute user={user} />}>
          <Route path="/onboarding" element={<OnboardingView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Route>

        {/* --- Protected Routes (Require Login) --- */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path='/note' element={<NoteView />} />
        </Route>


        <Route path="/" element={<Navigate to={user ? "/home" : "/onboarding"} replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;