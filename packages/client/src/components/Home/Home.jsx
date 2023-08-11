import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../AccountContext";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import useSocketSetup from "./useSocketSetup";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";

export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const Home = () => {
	const [friendList, setFriendList] = useState([]);
	const [messages, setMessages] = useState([]);
	const [friendIndex, setFriendIndex] = useState(0);

	const { user, setUser } = useContext(AccountContext);
	const [socket, setSocket] = useState(() => socketConn(user));

	const navigate = useNavigate();

	useEffect(() => {
		setSocket(() => socketConn(user));
	}, [user]);
	useSocketSetup(setFriendList, setMessages, socket);

	function logOut() {
		socket.emit("myDisconnect");
		localStorage.removeItem("token");
		setUser(null);
		navigate("/");
	}
	return (
		<FriendContext.Provider value={{ friendList, setFriendList }}>
			<SocketContext.Provider value={{ socket }}>
				<Grid
					templateColumns="repeat(10, 1fr)"
					h="100vh"
					as={Tabs}
					onChange={(index) => setFriendIndex(index)}
				>
					<GridItem colSpan="3" borderRight="1px solid gray">
						<Sidebar />
					</GridItem>
					<GridItem colSpan="7" maxH="100vh">
						<MessagesContext.Provider
							value={{ messages, setMessages }}
						>
							<Chat userid={friendList[friendIndex]?.userid} />
						</MessagesContext.Provider>
					</GridItem>
				</Grid>{" "}
				<Button
					pos="absolute"
					top="0"
					right="0"
					m="1rem"
					onClick={logOut}
				>
					Logout
				</Button>
			</SocketContext.Provider>
		</FriendContext.Provider>
	);
};

export default Home;
