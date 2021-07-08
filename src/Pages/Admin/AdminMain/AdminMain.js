import React, { useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import AddUserIcon from "../../../Components/Icons/Admin/AddUserIcon.svg";
import PowerUser from "../../../Components/Icons/Admin/powerUserIcon.svg";
import ExecUser from "../../../Components/Icons/Admin/execUserIcon.svg";
import "./styles.css";
import { Option } from "antd/lib/mentions";
import AdminUserCardCarousel from "../../../Components/Carousel/AdminUserCardCarousel/AdminUserCardCarousel";

export default function AdminMain(props) {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [activebox, setactivebox] = useState(1);
  const [users, setusers] = useState([
    {
      name: "John Doe",
      email: "johndoe@outlook.com",
      image:
        "data:image/png;base64, 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",
    },
    {
      name: "Alexa",
      email: "Alexa@outlook.com",
      image:
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADQAAAAzCAYAAADYfStTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABTCSURBVHgBdVrZchxXcj11q6r3BhoECZKgOBQpiqRkyVqskR4UjnCE7XD4A/zof/FX+cVPVthjaUaWNBYliiJIChQIEA10o/etluuTeW91N0RMM4rorapyPXkys4N//pd/tWFoYEyIMAoRhSECYxAEAYwcfN/wtQUQZCmi0SFKtSpmizlOTjoYDiYwUYT6RgPj4ZCvp5jOF8jyBHmWy1m8Fs+3ltcJ+DJAlmbuelg95Jut7Uu4dfcdbGxd1ntbfdd/nud6JAteN02xyDIEfG3l4H1Sy+/mmcjrhJdDH6qEQUhFoijm8xLfioE0x2w0Qm5Wn6uQNMB0OsNZt4fBaIIkS/TGNg9QKpcRlyLEcYCIh9xLzhEFeQWsPwyPQfcMP37zR/y69xOVsQjDiPeKnXGNceLx/gHvHfMaIqvlwVvBeN1pNPFApF4xXjEjN+R7QKQniSkX6QLt9hFG4ynmsxkFCNDabGFzs4FGtaoKlkolFTjLF/R2gFqljO2tFko0jBg7o2UDd1OKm+G1B89NkwQvnu7h8Jdn4lt3exHc8shD51dRqnCEGsO9J49IrKUWM86CEa0SStgFkb4vhhDzjUdDjPqnCOZlun1BZZrYaNapRIytrS0ct0/QH470OpsbG3rIPcRz81mKnCHhBLN6/KWHimUzvHjyCDvXd1GpN/27tEjAa0DkStQzTp3g3PmRVW3loHuZQ9SGLpSQcp4Ryyd5ilGvg/l8DpsmVGiKKhW5REVE+YzxfPPGNVQ6Zwh2tvX1bLpASo8kyYI3p2dECa/MSh/zFxXLmK8nx69w806V51EuNYgYWHLHeU0t9htH0yn8UujAQIRTcJDwM85bcpIIOB4OaCSrF0NmMZ9O+XeBS80a8vkUg7MusyJHTBlLcUjl+V6/70LCeoDhERZgo+FkV7n7W4Wo9IunP2PY7Wg+BZIaPiUKZYpwPOchjUVVyiV6kUsSfkX+WHoop6VVIH7eqFXw4I0d3Ny9jt54jOvbW4ySFJ3eEN3+2IUXbxjzuymFicJAjemUkCQWIzFfiE5in5yGyu0yjRww8U8ym2Lv0SO8/+llDeXcBq8B2OsKBU6RQplQksYEy4STv8l8xsQ2qMQV1IhcD25dwWef/Q0ajRaFyXB4+BKtehltwvhpvY9+r6+eyEoM1yxGmZ5v1iuqkAjfm0wwmtPrhPfpIsc8dZCcaqgJpK+EHI8GNFbC2C/7d10ZCDxaBkF2TqnI1RmnjDOj95DContrwdyR8CjHhGC+8e6De2gy6culsobqxr23GXI9vHG5o6E5GvYJq9AQrtbrWh9mkykm4wnRMkVvNKNnZ+jzuq+6YwwmCypO1wgKqlcFPFwNs1Qw11Dmc5GNBlkgWMOCwNc4Q2MEXqFwFWoFbgTLeBVgoEwEgwqtfOPKBrYvbSGOylpQQx5xUEbtahlbmxuYTkZYTCe0IC1nXXEQcJhQ0RITbM6iWqmVUe0TrboGk0rC0LOYJSyaUjw1rHJXaX2IGs1pwYZQiyh8ThZ4IGAm38t4fmQ0dxxTCFyWUQPvVrkkn9cJnVFcQimMce3SJSpRkhNRNg5I5EgWmeZGpdqg56pUYsG8m/NvouEXVSuoSKIw3KSszglejWqOGpUfE9ZTEXIhd2RBldDUA1oPlWGoNLyHlKKiiMIVVgEdYQriqcgpYjTE1CMGDomMpywMNaE6jeYmZinhulJCrPVKmETkDMHnteYGc6aGjIVxkcxYr5j0lhSFEC9UJfDm1MpOgWIW20qVTKJMJhAnCNLsQrQzHnFdvghiJEvDW69nxpDOeX7O8IzEXabgbqFXTGuQ8WFIreOyegGZ0VgOA7u8mdjJsE4olVIr0baCigw5AYCQ1CWnZYWuCO8S3igmzpjomaBcprWD37cKz+IhpU56C+ZGHOs1AqVKqf6VYJPkcHzPQ7egsXgo8BU3MEW8Bk4Rr6R8UTyRihVobWuzZW455HRCWOZARjRMFzOCyIQFeM77kyxaqyGd0XCVSgVJj8SV783ptSHDjZmuigu6wfq65JUR8C7FUvCL3C68lHk4uMCj7n+feIHPnbUCpv/onbhUJ89KNW5Lau1MLemqv1iUn7EQCxIJlNtESGqqCBWS45UJ9+VKjc8j9Yww8vFkpkDAUyH6qEFFkSWTyFGu1hR5V54IfP2BD7ngtwpZT+WdMheprYox5lv1KnZ3r6mCmdB4thC5pzdSJENas1Sq0KNlZFK/pE3wsW41H40Gy4KGWdCjKWnynM8TmzjhvHymqIcCMvWak8usWMHF3MI9IqN3k87DOnetNSrqaE3iHKV6A1cr29hqbZE1M/7p1dlccpRVgQhYKRO26KGoQiHyhnIvY2aaH8LLMiqwIKmV8KJ12FIIIBDd5gLXK4GEVUueWDhmHtFAimeBA5SV94JCwvOFVYpMqJV35Q0Xfg4cAoVGy9rRQCUbE1FYMyjYiOFyfNpVS9dZZFtUdJsNWo0hZbRPYh9lUs05AZg5PTpmMe2xIRwsUrQZcgf9IRn6GFO2I4vUag/lxCisSkOyeK+oznlvhBYK78XnkjKRWUK0P3xfUSgjCWnSCI0ShRoyeWn5vSfP8fjZL/RSjEVuVMjZbIJN0p97N2/gk/feRmujzjyaq3ekQeyRqH7Pc3551cFJb4yz4ZSeSaRT4DUz9YySXzVkqCgnHqkQTGaTMQ1ao6F8nogi2lOZ81qKQkFRjUOzVGb5uSol7yd4b6eMn3qC9Y5UPrj3gAAQ4vD4BDutBqYD9kskqqek/M/rBu+8dRv1JnuZJECH3/njw6f4+ud9bZ0jQnGr1RLfaz2bMmxH9NSEDN56Juc+M3j8/Z/RqD/Dh3/79+o460FQUuWiymVCj3CFYgUka6gJC1ayaLFZAi5vbernb9zYxdt3b6MapdI+oUcP7nUnSOmxrWqEZplMgshWbzS1jd9/eYSvHz/DmCAS0YQffvg+wkYDbTaNxz227iSzQnprPM+EnscFVu9vqexsPHKzA5WL3vOGLwrrOipHQVGFi1AriOky71yTW5L+yCPNjd1dJax9zgA+/OADHM1jDGYLXNlq4FojwlZTmMWGWl8ucnTSJUxnWo8qnFG8fecezkh3hPfFFHTCTjehsmU2jQrj0BKmuWT0yL2SZinWCkd+0z4UFGJ9nlAU1EJrSbxJUPJ0J/aJavDRx79Ht9vHnZ1NTO9cwyUJ28UY2zduKHRbmUvwED6pZJ7/bZBGHf/8CA82Kti5cRXHVPaleCAItUuOhG0vC6xVQCqTBwoRdsTV+vJilTvkavBwCQxR4JmB/DV4XRm1AalNL6wTaiOdxAhzkJsI8rW2dxAxXDajd9E/abP2MMwI4YGnInKzjAhm1DAWE2L9gB6pV2Ls0KMmZF6yrR6MBelyDTkHDqFSJuGKN++959qbzBZMwDF5ogNP1SYSql6mY50lmzVmpUwRfoGP1YhIVaICZo1JyIgqKtd0HlFrOsCoEEurpVBLv2XHybZT53OSD9qFEr5H9MiYiFhvVtj91tFqzJU92KljIktYlpJC4zUv7yxzJtePc/Vcbo2b3QWO4Wl3vMTwJUXHUhl3kUCJvAgS2mzJK5RpS08kVIeJG7GH2Wpt0HILcOCgVEjuJe27hJHVmiHsgPWIik6mYypuZAbANqLCGUSibL6QwLpOQjFPQGCdSTjRnFGtcUW3mBdqHXLp57Q3ywGEC0F3B4NRSg6XCmRnWE5aQ1N8TOJZ1qYuk96GCkobIdMjIZ3SvktIZwwpgW0ppCMOJUu0crVaR1iwcEG1vNBGSybqLNgRQ10Mafw8oph1rOOB9aFkVrmyVlDXSKoOHWnFqbBmkksRZsmMxexCMQI/5xO6w9BZzGYK9yEbQsmnSDpKuJZEhiPzRJSakz3MddZWtA8yzEzz1EOYVbkv7Vxxg9AC0YIAr3PSwBlXPLQOAKt65MesWFnBULhGfYPj3qG2EprweeaGkkJxc1cSc6FNwi6YV2Xyv4jd7sZG018ErjCTLs0Tab3LnN/NQDqnITdfpJ4h5M4/NFBcqSo1k5wRtHTR5nqqVXoUISiDxsB3HoXm5vyYqOCCFB0viEQxFborLJvQrbQ+zxyiaWOWqoUlwZ9xlHv91lsEjBinZAFzmdx4S0o/pMNg/h2xns2p5JAsYUGFdGTAbwqbuP7GTVy98aZLAe3ZeF4WvMa2xbs5WbuQ5siF1BqqFcVr7T1ViPnRy9nTzKGjYOlOtR/Kc8cF9cq0KJn3eDSGUPGzo0PMaLHnr04V6QRIBCDKcai0xrJ6LujZMT02lTbCswH5b3vnGh589IlGhraQavlcDWf9FHaVQB4DtGM9R+6wpth5au76mRz9xLDqszFjHySDEyM3yawOROS5dAeXOZOOCRKGHeqPPzzmDJzw3K9qmFVo+QbnCCKBKJExP0cMO2n4XAsviW+xcanlxk3a8ofqdcfwipEy3N88X0aTopz1gHFuzAr4tUewpqTRPobgTQHm2KRw5VKmN5dBYC6oRiCQkdXPj39G57Sj3G3GkPrgnds44d6oczbUuVxa5pSI15NNRsIQmtMKSeaMoW0M/2ttX9E8lAJrUVCztHCIC3Hri4hHW0MWExmfTAWXKxQpWomVkpKo5GKNTRx3B8rnEplwSCJzfjDlfODkuE0q1MVg0FdYn3BgP+iNsEuP3d/dxiPmV59tQ5/QXpY5AkNuRo4nXWyaO6trzaciG5uXIBuQorIvRyi2GMZgOQvxaKOAFK3HWgHV8B5bf7gJD3t8otYJNxEzClOKrRJW2Uq8fHmok1FL6vLW/fusrXPcun0HY8675ZztZg/XtqRjNY55GBlIGR30S21CkSe8x+b2NUef4ITOg9zPLRwDd7JaN8yRnZK08NJUSg7hoocvrqbA/QK6aXWULbozVnXCrIx7LSVL2cTFZMpnh2esQSkG7aHSftnSnbE1GBDlegyvU3psyEGj1J73376t8P/js5cyWHOWl8kp/1373Zuuay6MaaGNpfovcDRKFfQryYwgZWU+ztCPCvnP6YMC791hlx6EFto8ruNVu406u9MZi2hIaaoEgNt37qDJHmjS6SFijzRkzlTzGHev3+aybIyvnnA9Qm+WqxxW2lTzo5joFHO5iJ3pFbJwV0LMcjmmm48wUA/nhDJuctyAUfZPsmMlZMsRraPaRQ+/3XAqWRfPzZ3r+L8nf8ZWraSsOeSFhYnLJi/k8KNaqWPcn6DBCm8Zlglv1KfXFhEFLrn2+uXpGefZKZFv4eudW63cvf8OavXmeRnObf3c8lmUY2DQy7mOzXJf7KP1XFnVnte9FRSQCRnjRmwnNvHtw8f4K/ZBG5ydhYTpRLYUsmNlzUrMAr8O2zg4OSVQnLliullFPZDGboqzyRyTRFDRsQKRt0mDvHXvXR0+qvecNkuFJNQC/3zJbNa86D0ZrIlePDv/PMB64XWvt1jFHx11sf/riUKx1g9aa8GKH7BlmA96OD08wKR3xvndBPUwx012s1frbENki+CGdSKCCzcrUL3NdiFGMf9cKZL78bDLH1+K/KbcAVnx3eg1BYJgOZE8X4d8byQCGDfvvvXep/jh4R/YwYa4/+Yt3XZHkbamuPG7W1z63iSEc1/EpdWYPVCPYZbQK51ZjjGpfco2QsZiImyo1D+EW6Cudq9FrXFF1IVWwVKsx3njveSQ7rxzijAttFh+GKx7KHAkNmKD99nvP8bJWR+Pnj0ncSVnS+UObCW47ZMWXIYlEhZzIpEsuI4HI4z4XH64IfEvOx31E79zsL+Po4MXy3Hwet4UObI+1C9Qbp0MmOKkizDB4mIE1K6VhvzfL/6TxSTB559/ro3WNz/8iOcHhzjiiv/k9FQL7JDt9mmnixMi31Gnj/ZwhlOu+sfMI92Qi89DVxpSKvz1f/8XF8XdpcWL1iYvapB6z7MHHzMFYklIRmvueE2hi3HPXebgyVMcv3hGC7+r46qPPvkUe3tP8cXXX2vovMk1vxDQHutQj3XopD8gd8vRGXIoSXaRu15aByOhh24hnzmV+varL/H5P/yTUiFRRFi0rCYFpkUhnQVJ+21d7gjLV+Xziwqrcoq19sEboBjOikW7r9p4/OUfEMqOhyglM4VKuYL77zxAjVOdHx8+xItXx+RuAx1+JKkw6lRn26KM/O5Aa5opfk/klmCul+ZS+eQY7aMDbO3s6h5JlllQYNCK5QqwzCyyzP8Mx2qflTuFLvbDUjmc53gjFstv/uPfuQfqCyvkjHuiMK1DFObLzZs30WRx7J62uT6RBi7B0eERW4hj7L041OslOp13sR8rENi1iam777OfHuFjop4KSoWk0811ZOyG/zkLs9WFWe5+DKVLtjUPFQKvLR/WosxqoMmJD//nC+SjPk9kolOoA455tS9SFuHmdjWGoHSY8qOmxmYNOwyZY87vhNpHuvx1vE1CUudwmSiXn+OPZ8fH6LaP0Whd0ZY/164/d+xAXiu7T5V2ySEtjHwpWiljl+Fm/bxA4NG4/lpj7ul33+GMeRNpHFsdiuy9+JWkdKorfvnBkrTkNU5xYoZhs2mVuMqwvcscEgpaiqUX0sU9n5c0XKTXcdTX+h9oCK1J8f2fvsL2tevY2LqC5kZLZRThc9kWyopGf/mV6Y+iMkcGizrktC9+EJR79wt7nXD23H76BO2X+xi3O7SyH5hb57VOZ8B2ex9/zVm1bnZ8XsjWTua51k5JTodkBxxbMQQXSabWFM/E/I4orG2KdeVAdrpKRnmPGUddB8/3EDx7ijLDePvqdbQus/hyiitey3TZlriQo5GkNws/+7t//LclXxML0GJz3nzUOcUv332LJ3/6Er2DfUw5S3BDPbdOz+Bm0IlMdyjB3du31OJLGFWEcj9CSgkEHACS5mTqDWHZUex/DiDLM3gq4+lVBLeAy+0q/DNC/LB/hn7nTHNF6Jd4R36OJk1lkU8KCkK/e2dd9A9fov3qEONhj8MI+X0BNFcctciXEyFZZXB3zn4m1QHs3v4h9vdf4P69e/pzs2KdKC1UmYxis7WJ3Td2dRiYo83iO/cFMtfZn/FGCGNHXDUXbO5HvKtyIS8T9k9tFt9OeMRms87wruncQX8vxPP+H1R1tgdb8g5PAAAAAElFTkSuQmCC",
    },
    {
      name: "Google",
      email: "google@google.com",
      image:
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADQAAAAzCAYAAADYfStTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABTCSURBVHgBdVrZchxXcj11q6r3BhoECZKgOBQpiqRkyVqskR4UjnCE7XD4A/zof/FX+cVPVthjaUaWNBYliiJIChQIEA10o/etluuTeW91N0RMM4rorapyPXkys4N//pd/tWFoYEyIMAoRhSECYxAEAYwcfN/wtQUQZCmi0SFKtSpmizlOTjoYDiYwUYT6RgPj4ZCvp5jOF8jyBHmWy1m8Fs+3ltcJ+DJAlmbuelg95Jut7Uu4dfcdbGxd1ntbfdd/nud6JAteN02xyDIEfG3l4H1Sy+/mmcjrhJdDH6qEQUhFoijm8xLfioE0x2w0Qm5Wn6uQNMB0OsNZt4fBaIIkS/TGNg9QKpcRlyLEcYCIh9xLzhEFeQWsPwyPQfcMP37zR/y69xOVsQjDiPeKnXGNceLx/gHvHfMaIqvlwVvBeN1pNPFApF4xXjEjN+R7QKQniSkX6QLt9hFG4ynmsxkFCNDabGFzs4FGtaoKlkolFTjLF/R2gFqljO2tFko0jBg7o2UDd1OKm+G1B89NkwQvnu7h8Jdn4lt3exHc8shD51dRqnCEGsO9J49IrKUWM86CEa0SStgFkb4vhhDzjUdDjPqnCOZlun1BZZrYaNapRIytrS0ct0/QH470OpsbG3rIPcRz81mKnCHhBLN6/KWHimUzvHjyCDvXd1GpN/27tEjAa0DkStQzTp3g3PmRVW3loHuZQ9SGLpSQcp4Ryyd5ilGvg/l8DpsmVGiKKhW5REVE+YzxfPPGNVQ6Zwh2tvX1bLpASo8kyYI3p2dECa/MSh/zFxXLmK8nx69w806V51EuNYgYWHLHeU0t9htH0yn8UujAQIRTcJDwM85bcpIIOB4OaCSrF0NmMZ9O+XeBS80a8vkUg7MusyJHTBlLcUjl+V6/70LCeoDhERZgo+FkV7n7W4Wo9IunP2PY7Wg+BZIaPiUKZYpwPOchjUVVyiV6kUsSfkX+WHoop6VVIH7eqFXw4I0d3Ny9jt54jOvbW4ySFJ3eEN3+2IUXbxjzuymFicJAjemUkCQWIzFfiE5in5yGyu0yjRww8U8ym2Lv0SO8/+llDeXcBq8B2OsKBU6RQplQksYEy4STv8l8xsQ2qMQV1IhcD25dwWef/Q0ajRaFyXB4+BKtehltwvhpvY9+r6+eyEoM1yxGmZ5v1iuqkAjfm0wwmtPrhPfpIsc8dZCcaqgJpK+EHI8GNFbC2C/7d10ZCDxaBkF2TqnI1RmnjDOj95DContrwdyR8CjHhGC+8e6De2gy6culsobqxr23GXI9vHG5o6E5GvYJq9AQrtbrWh9mkykm4wnRMkVvNKNnZ+jzuq+6YwwmCypO1wgKqlcFPFwNs1Qw11Dmc5GNBlkgWMOCwNc4Q2MEXqFwFWoFbgTLeBVgoEwEgwqtfOPKBrYvbSGOylpQQx5xUEbtahlbmxuYTkZYTCe0IC1nXXEQcJhQ0RITbM6iWqmVUe0TrboGk0rC0LOYJSyaUjw1rHJXaX2IGs1pwYZQiyh8ThZ4IGAm38t4fmQ0dxxTCFyWUQPvVrkkn9cJnVFcQimMce3SJSpRkhNRNg5I5EgWmeZGpdqg56pUYsG8m/NvouEXVSuoSKIw3KSszglejWqOGpUfE9ZTEXIhd2RBldDUA1oPlWGoNLyHlKKiiMIVVgEdYQriqcgpYjTE1CMGDomMpywMNaE6jeYmZinhulJCrPVKmETkDMHnteYGc6aGjIVxkcxYr5j0lhSFEC9UJfDm1MpOgWIW20qVTKJMJhAnCNLsQrQzHnFdvghiJEvDW69nxpDOeX7O8IzEXabgbqFXTGuQ8WFIreOyegGZ0VgOA7u8mdjJsE4olVIr0baCigw5AYCQ1CWnZYWuCO8S3igmzpjomaBcprWD37cKz+IhpU56C+ZGHOs1AqVKqf6VYJPkcHzPQ7egsXgo8BU3MEW8Bk4Rr6R8UTyRihVobWuzZW455HRCWOZARjRMFzOCyIQFeM77kyxaqyGd0XCVSgVJj8SV783ptSHDjZmuigu6wfq65JUR8C7FUvCL3C68lHk4uMCj7n+feIHPnbUCpv/onbhUJ89KNW5Lau1MLemqv1iUn7EQCxIJlNtESGqqCBWS45UJ9+VKjc8j9Yww8vFkpkDAUyH6qEFFkSWTyFGu1hR5V54IfP2BD7ngtwpZT+WdMheprYox5lv1KnZ3r6mCmdB4thC5pzdSJENas1Sq0KNlZFK/pE3wsW41H40Gy4KGWdCjKWnynM8TmzjhvHymqIcCMvWak8usWMHF3MI9IqN3k87DOnetNSrqaE3iHKV6A1cr29hqbZE1M/7p1dlccpRVgQhYKRO26KGoQiHyhnIvY2aaH8LLMiqwIKmV8KJ12FIIIBDd5gLXK4GEVUueWDhmHtFAimeBA5SV94JCwvOFVYpMqJV35Q0Xfg4cAoVGy9rRQCUbE1FYMyjYiOFyfNpVS9dZZFtUdJsNWo0hZbRPYh9lUs05AZg5PTpmMe2xIRwsUrQZcgf9IRn6GFO2I4vUag/lxCisSkOyeK+oznlvhBYK78XnkjKRWUK0P3xfUSgjCWnSCI0ShRoyeWn5vSfP8fjZL/RSjEVuVMjZbIJN0p97N2/gk/feRmujzjyaq3ekQeyRqH7Pc3551cFJb4yz4ZSeSaRT4DUz9YySXzVkqCgnHqkQTGaTMQ1ao6F8nogi2lOZ81qKQkFRjUOzVGb5uSol7yd4b6eMn3qC9Y5UPrj3gAAQ4vD4BDutBqYD9kskqqek/M/rBu+8dRv1JnuZJECH3/njw6f4+ud9bZ0jQnGr1RLfaz2bMmxH9NSEDN56Juc+M3j8/Z/RqD/Dh3/79+o460FQUuWiymVCj3CFYgUka6gJC1ayaLFZAi5vbernb9zYxdt3b6MapdI+oUcP7nUnSOmxrWqEZplMgshWbzS1jd9/eYSvHz/DmCAS0YQffvg+wkYDbTaNxz227iSzQnprPM+EnscFVu9vqexsPHKzA5WL3vOGLwrrOipHQVGFi1AriOky71yTW5L+yCPNjd1dJax9zgA+/OADHM1jDGYLXNlq4FojwlZTmMWGWl8ucnTSJUxnWo8qnFG8fecezkh3hPfFFHTCTjehsmU2jQrj0BKmuWT0yL2SZinWCkd+0z4UFGJ9nlAU1EJrSbxJUPJ0J/aJavDRx79Ht9vHnZ1NTO9cwyUJ28UY2zduKHRbmUvwED6pZJ7/bZBGHf/8CA82Kti5cRXHVPaleCAItUuOhG0vC6xVQCqTBwoRdsTV+vJilTvkavBwCQxR4JmB/DV4XRm1AalNL6wTaiOdxAhzkJsI8rW2dxAxXDajd9E/abP2MMwI4YGnInKzjAhm1DAWE2L9gB6pV2Ls0KMmZF6yrR6MBelyDTkHDqFSJuGKN++959qbzBZMwDF5ogNP1SYSql6mY50lmzVmpUwRfoGP1YhIVaICZo1JyIgqKtd0HlFrOsCoEEurpVBLv2XHybZT53OSD9qFEr5H9MiYiFhvVtj91tFqzJU92KljIktYlpJC4zUv7yxzJtePc/Vcbo2b3QWO4Wl3vMTwJUXHUhl3kUCJvAgS2mzJK5RpS08kVIeJG7GH2Wpt0HILcOCgVEjuJe27hJHVmiHsgPWIik6mYypuZAbANqLCGUSibL6QwLpOQjFPQGCdSTjRnFGtcUW3mBdqHXLp57Q3ywGEC0F3B4NRSg6XCmRnWE5aQ1N8TOJZ1qYuk96GCkobIdMjIZ3SvktIZwwpgW0ppCMOJUu0crVaR1iwcEG1vNBGSybqLNgRQ10Mafw8oph1rOOB9aFkVrmyVlDXSKoOHWnFqbBmkksRZsmMxexCMQI/5xO6w9BZzGYK9yEbQsmnSDpKuJZEhiPzRJSakz3MddZWtA8yzEzz1EOYVbkv7Vxxg9AC0YIAr3PSwBlXPLQOAKt65MesWFnBULhGfYPj3qG2EprweeaGkkJxc1cSc6FNwi6YV2Xyv4jd7sZG018ErjCTLs0Tab3LnN/NQDqnITdfpJ4h5M4/NFBcqSo1k5wRtHTR5nqqVXoUISiDxsB3HoXm5vyYqOCCFB0viEQxFborLJvQrbQ+zxyiaWOWqoUlwZ9xlHv91lsEjBinZAFzmdx4S0o/pMNg/h2xns2p5JAsYUGFdGTAbwqbuP7GTVy98aZLAe3ZeF4WvMa2xbs5WbuQ5siF1BqqFcVr7T1ViPnRy9nTzKGjYOlOtR/Kc8cF9cq0KJn3eDSGUPGzo0PMaLHnr04V6QRIBCDKcai0xrJ6LujZMT02lTbCswH5b3vnGh589IlGhraQavlcDWf9FHaVQB4DtGM9R+6wpth5au76mRz9xLDqszFjHySDEyM3yawOROS5dAeXOZOOCRKGHeqPPzzmDJzw3K9qmFVo+QbnCCKBKJExP0cMO2n4XAsviW+xcanlxk3a8ofqdcfwipEy3N88X0aTopz1gHFuzAr4tUewpqTRPobgTQHm2KRw5VKmN5dBYC6oRiCQkdXPj39G57Sj3G3GkPrgnds44d6oczbUuVxa5pSI15NNRsIQmtMKSeaMoW0M/2ttX9E8lAJrUVCztHCIC3Hri4hHW0MWExmfTAWXKxQpWomVkpKo5GKNTRx3B8rnEplwSCJzfjDlfODkuE0q1MVg0FdYn3BgP+iNsEuP3d/dxiPmV59tQ5/QXpY5AkNuRo4nXWyaO6trzaciG5uXIBuQorIvRyi2GMZgOQvxaKOAFK3HWgHV8B5bf7gJD3t8otYJNxEzClOKrRJW2Uq8fHmok1FL6vLW/fusrXPcun0HY8675ZztZg/XtqRjNY55GBlIGR30S21CkSe8x+b2NUef4ITOg9zPLRwDd7JaN8yRnZK08NJUSg7hoocvrqbA/QK6aXWULbozVnXCrIx7LSVL2cTFZMpnh2esQSkG7aHSftnSnbE1GBDlegyvU3psyEGj1J73376t8P/js5cyWHOWl8kp/1373Zuuay6MaaGNpfovcDRKFfQryYwgZWU+ztCPCvnP6YMC791hlx6EFto8ruNVu406u9MZi2hIaaoEgNt37qDJHmjS6SFijzRkzlTzGHev3+aybIyvnnA9Qm+WqxxW2lTzo5joFHO5iJ3pFbJwV0LMcjmmm48wUA/nhDJuctyAUfZPsmMlZMsRraPaRQ+/3XAqWRfPzZ3r+L8nf8ZWraSsOeSFhYnLJi/k8KNaqWPcn6DBCm8Zlglv1KfXFhEFLrn2+uXpGefZKZFv4eudW63cvf8OavXmeRnObf3c8lmUY2DQy7mOzXJf7KP1XFnVnte9FRSQCRnjRmwnNvHtw8f4K/ZBG5ydhYTpRLYUsmNlzUrMAr8O2zg4OSVQnLliullFPZDGboqzyRyTRFDRsQKRt0mDvHXvXR0+qvecNkuFJNQC/3zJbNa86D0ZrIlePDv/PMB64XWvt1jFHx11sf/riUKx1g9aa8GKH7BlmA96OD08wKR3xvndBPUwx012s1frbENki+CGdSKCCzcrUL3NdiFGMf9cKZL78bDLH1+K/KbcAVnx3eg1BYJgOZE8X4d8byQCGDfvvvXep/jh4R/YwYa4/+Yt3XZHkbamuPG7W1z63iSEc1/EpdWYPVCPYZbQK51ZjjGpfco2QsZiImyo1D+EW6Cudq9FrXFF1IVWwVKsx3njveSQ7rxzijAttFh+GKx7KHAkNmKD99nvP8bJWR+Pnj0ncSVnS+UObCW47ZMWXIYlEhZzIpEsuI4HI4z4XH64IfEvOx31E79zsL+Po4MXy3Hwet4UObI+1C9Qbp0MmOKkizDB4mIE1K6VhvzfL/6TxSTB559/ro3WNz/8iOcHhzjiiv/k9FQL7JDt9mmnixMi31Gnj/ZwhlOu+sfMI92Qi89DVxpSKvz1f/8XF8XdpcWL1iYvapB6z7MHHzMFYklIRmvueE2hi3HPXebgyVMcv3hGC7+r46qPPvkUe3tP8cXXX2vovMk1vxDQHutQj3XopD8gd8vRGXIoSXaRu15aByOhh24hnzmV+varL/H5P/yTUiFRRFi0rCYFpkUhnQVJ+21d7gjLV+Xziwqrcoq19sEboBjOikW7r9p4/OUfEMqOhyglM4VKuYL77zxAjVOdHx8+xItXx+RuAx1+JKkw6lRn26KM/O5Aa5opfk/klmCul+ZS+eQY7aMDbO3s6h5JlllQYNCK5QqwzCyyzP8Mx2qflTuFLvbDUjmc53gjFstv/uPfuQfqCyvkjHuiMK1DFObLzZs30WRx7J62uT6RBi7B0eERW4hj7L041OslOp13sR8rENi1iam777OfHuFjop4KSoWk0811ZOyG/zkLs9WFWe5+DKVLtjUPFQKvLR/WosxqoMmJD//nC+SjPk9kolOoA455tS9SFuHmdjWGoHSY8qOmxmYNOwyZY87vhNpHuvx1vE1CUudwmSiXn+OPZ8fH6LaP0Whd0ZY/164/d+xAXiu7T5V2ySEtjHwpWiljl+Fm/bxA4NG4/lpj7ul33+GMeRNpHFsdiuy9+JWkdKorfvnBkrTkNU5xYoZhs2mVuMqwvcscEgpaiqUX0sU9n5c0XKTXcdTX+h9oCK1J8f2fvsL2tevY2LqC5kZLZRThc9kWyopGf/mV6Y+iMkcGizrktC9+EJR79wt7nXD23H76BO2X+xi3O7SyH5hb57VOZ8B2ex9/zVm1bnZ8XsjWTua51k5JTodkBxxbMQQXSabWFM/E/I4orG2KdeVAdrpKRnmPGUddB8/3EDx7ijLDePvqdbQus/hyiitey3TZlriQo5GkNws/+7t//LclXxML0GJz3nzUOcUv332LJ3/6Er2DfUw5S3BDPbdOz+Bm0IlMdyjB3du31OJLGFWEcj9CSgkEHACS5mTqDWHZUex/DiDLM3gq4+lVBLeAy+0q/DNC/LB/hn7nTHNF6Jd4R36OJk1lkU8KCkK/e2dd9A9fov3qEONhj8MI+X0BNFcctciXEyFZZXB3zn4m1QHs3v4h9vdf4P69e/pzs2KdKC1UmYxis7WJ3Td2dRiYo83iO/cFMtfZn/FGCGNHXDUXbO5HvKtyIS8T9k9tFt9OeMRms87wruncQX8vxPP+H1R1tgdb8g5PAAAAAElFTkSuQmCC",
    },
  ]);

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const UserPage = () => {
    props.history.push({
      pathname: `/admin/user_management/`,
      state: {
        detail: "I am from Databuckets Screen",
        page_name: "Datasets_Screen",
      },
    });
  };

  return (
    <div className="AdminMain">
      <div className="title">Admin Dashboard</div>
      <div className="Containers">
        <div className="col1">
          <img src={AddUserIcon} alt="icon" />
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#6d6d6d",
              marginTop: "5px",
            }}
          >
            Add New User
          </div>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ requiredMarkValue: requiredMark }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            <Form.Item label="Email" required>
              <Input placeholder="Enter email address..." />
            </Form.Item>
            <Form.Item label="Full Name" required>
              <Input placeholder="Enter full name..." />
            </Form.Item>
            <Form.Item required label="Role">
              <Select
                defaultValue="power"
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                <Option value="power">Power User</Option>
                <Option value="executive">Executive User </Option>
              </Select>
            </Form.Item>
            <Form.Item label="Allot Space (GBs)" required>
              <Input placeholder="Allot space to the user..." type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="submitBtn">
                Add New User
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col2">
          <div className="subCol1">
            <div className="innerTitle">User Management</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    flexGrow: "1",
                    display: "flex",
                    marginTop: "20px",
                    borderRight: "2px dashed #E1EEFF",
                  }}
                >
                  <div
                    className={"UserBox"}
                    style={
                      activebox === 1
                        ? { border: "2px solid #085fab" }
                        : { border: "2px solid transparent" }
                    }
                    onClick={() => setactivebox(1)}
                  >
                    <img src={PowerUser} alt="icon" />
                    Power User
                  </div>
                  <div
                    className={"UserBox"}
                    onClick={() => setactivebox(2)}
                    style={
                      activebox === 2
                        ? { border: "2px solid #085fab" }
                        : { border: "2px solid transparent" }
                    }
                  >
                    <img src={ExecUser} alt="icon" />
                    Executive User
                  </div>
                </div>
                <Button
                  type="primary"
                  className="exploreBtn"
                  onClick={() => UserPage()}
                >
                  Explore More
                </Button>
              </div>
              <div style={{ width: "50%" }}>
                <AdminUserCardCarousel data={users} />
              </div>
            </div>
          </div>
          <div className="subCol2">
            <div className="innerTitle">Space Management</div>
            <div
              style={{
                display: "flex",
                height: "100%",
                alignItems: "flex-end",
              }}
            >
              <Button type="primary" className="exploreBtn">
                Explore More
              </Button>
              <div style={{ height: "100%" }}>Graph</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
