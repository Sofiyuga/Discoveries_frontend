import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";
import {variables} from "../../../utils/consts";
import CustomButton from "../../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {

    const navigate = useNavigate()

    const {is_authenticated,is_moderator, auth, user_name, logOut} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        auth()
    }, [])

    const doLogOut = async () => {

		await logOut()

		navigate("/")
	}

    return (
        <div>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/pioneers" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                    <span>Первооткрыватели</span>
                </Link>

                {is_authenticated &&
                    <Link to="/discoveries" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Открытия</span>
                    </Link>
                }

                {/* {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>{user_name}</span>
                    </Link>
                } */}

                {is_authenticated &&
                    <Link to="/profile" className="menu-item">
                      
                        <span>Вы -  {is_moderator ? "Модератор" : "Пользователь"} {user_name}</span>
                    </Link>
                }

                {is_authenticated &&
                    <CustomButton bg={variables.primary} onClick={doLogOut} >Выйти</CustomButton>
                    
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => {setIsOpen(false)}}>
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default NavMenu;