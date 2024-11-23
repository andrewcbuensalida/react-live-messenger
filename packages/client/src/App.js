import AccountContextProvider from "./components/AccountContext";
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";

function App() {
	return (
		<AccountContextProvider>
			<Views />
			<ToggleColorMode />
		</AccountContextProvider>
	);
}

export default App;
