// import required modules
import { Link, useNavigate } from "react-router-dom";

// Mock data for demonstration
const latestMobiles = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    brand: "Apple",
    price: "134999",
    latest:true,
    databaseId: 1,
    image:
      "https://ea-unboxed-assets.croma.com/cromaunboxed-as/2025/09/68c07f744f567-68c07f744f568iPhone-17-17-Pro-and-17-Pro-Max-price-in-India.png.png",
    discount: 0,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: "129999",
    databaseId: 1,
    image:
      "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s25-ultra/buy/S25_Titanium_PDP_720x480.jpg?imbypass=true",
    discount: 5,
  },
  {
    id: 3,
    name: "Google Pixel 10 Pro ",
    brand: "Google",
    price: "109999",
    latest:true,
    databaseId: 8,
    image: "https://cdn.beebom.com/content/2025/07/sdasadsad.jpg",
    discount: 0,
  },
  {
    id: 4,
    name: "OnePlus Open",
    brand: "OnePlus",
    price: "149999",
    databaseId: 8,
    image:
      "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/product/hedwig/open-share.jpg",
    discount: 8,
  },
  {
    id: 5,
    name: "Xiaomi 15 pro",
    brand: "Xiaomi",
    price: "109999",
    databaseId: 8,
    image:
      "data:image/jpeg;base64,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",
    discount: 12,
  },
  {
    id: 6,
    name: "Asus ROG Phone 8 Pro Edition ",
    brand: "Asus",
    price: "119999",
    databaseId: 8,
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVFRUXFxUXFRUVFxUVFRYYFxUXFxUVFRUYHSggGBolHRUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0fICUtLS0rLSstLS0tLS0tLS0tLS0tLS0tLS0vLS0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLf/AABEIAKgBKwMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwEEBQYAB//EAD0QAAIBAgQEAwUGBQMEAwAAAAECAAMRBBIhMQVBUWEicYEGEzJSkSNCobHB0RRyguHwM1NiB5Ki8UNz0v/EABsBAAIDAQEBAAAAAAAAAAAAAAABAgMEBQYH/8QAMxEAAgIBAgQEBAYCAgMAAAAAAAECAxEEIQUSMUEiUWFxE6HR8BQygZHB4QYzovFCUpL/2gAMAwEAAhEDEQA/APnImY7YxRAYxRAYYEAGAQGEogAdoDDEQ0aGD4o6aHxDod/QyqdMZehqq1dkNnujbweOSpsbH5Tv6dZjnVKJ0qtTCzoy3Ky88IATaAghGIkQAmAiRACYCCAjEIxuOp0VvUa19huzHoqjUnykowcuhXOaiY9avXxHWhSPIf6zDuRog8te8vjGMfViVc57y2Xz/cZhMNTpjKgA67X9eZMbz1ZfFQj4Y/sOiJgtAAM/aA8HjAQJgPALQDAtoBgW0YxZEAwJrbxoBTSQYFtAMC7xiaAIjIsSwgAu0YFUCWHmQ1EBjQIDDWIBgEYBgRDCAgMICAwgsADAgM0cJxN10PiHff0MpnTGXTY01aqcNnujYwuNSpsbHodD/eZJ1SidGvUQs6FmVlxIgI9GAQgIkQA8WAFyQANSToB5mNLJFtLdmZV4o9TTDjTnWcHJ/Qu7+eg85dGvHUrSlP8ALsvP6CKOFVGzEtUrN94+KoeygfCuvKwEtSctkE506aPNN/VnU8K9lXqZWxDe6U2+zU+P+t/u+Q+plkeSLWXl/I42p4jbamq1yr/k/oafHuB0vdGnQsLDw5dLEdAdA3MHrvcEg3J5eM5RiqrljnS5ZdjhqVQm4bRlOVh37A8iCCL8iJmnDleD0+l1CvqU117+5XxGNs4pIjVKhF8qWFhtmZmNlF9L6+Utqp5t2c/X8UVEuStZff0/sRjEr2s74fD5tFuzVHubC4uUW9yOR3E0KiHkcaXFtVJ/mx7JHjVqUQPekMt7NUC5cvQstyMvflp5iqzT4WYnR0XGXKXJd+/1+pczTIehQJMBgtAYqpAMCiYx4E1ZJDQsiMAHECIs6Rg0LjItAuICFwEUllp5kYogMYIhjAIwDEQxiiAwgIDCEAwEBAYQEACgMIQA0MLxR10bxDvv9ZROiMumxpr1U49d0a2FxiPsbHod/wC8yzqlHqdCu+E+jLEgWhQEVsRjQpKqM7dBoB/O2y+Wp7SyMG+uxHLe0Vko1qWbx12BA1C7U16eH7x7m/a0uisbRG4xguax9P2RtcH4DXxWqg0qX+44sSP+Cn9fpLORLeRydVxdLw0rPq/4R23CeAUMKPs1u53qN4nPqdpCVje3Y4spSnLmm8ssYkyvqzRWjLxVcBCoXxX+L1v59prhKKjhI1V1SdnM3t5HB+2VXJfEItnCH3i8jlBIcdxqSOhY8hLZQ+Ii3MtFJzW8JdfR9iv7L8OSlRDBjUdwGeqbkubCwueQGgE0LoeblJttsTxzDPVdlpV/diqn8PVDUy6sBmfKj2sKlmOl76djGRE8UWuGaktFqgYUfdVRVyrSCm1UVad7VAw3uDcHTXZCKlRv4RxTY3oMbU3P/wAZ/wBtj8vQ+ky3U90eh4ZxLGKrXt2Zo3mQ9KiLwGLrcoySQpoDEsJIMCmMYAM99IBgU0khYF3gDQLNGQwLvAeCqksPLDViGGIDGLABggAYgSCEBhiABiABCAyYAEBAZNoAEIgL2G4m66N4h+P15ymdCl02NVeqlHZ7miK2dQRcA8tjvbU/tKVXy9dzo1tWR5j3DcO+If3WFp5yN22pJ/M2xO+g6GXqttZexi1PE6qViG7+R3fBfYulRs9c+/rbi4+zT+VP1MnlJbHnb9XbqHmb28ux0qJfyEqSyUt4IqUxFJIcZMo4ijfnK9kaYTwYWLEnGWDp1PJgY+kHuDb/ADnNELUja61ZW65dGcbwet/DV2whPg1aieg3anc9L3HYg85rjLKyeR1FMqpuEuqL44d9rn9/U917z33uNPd+9tbPffne3WTwUlbD0q4qKrLRCI1VjWX/AFqwe+VH7AkHXbKLc7gFvG0EqIVcAqQQRBgjm8Jizh3FCq10P+lUPT5GP6/4Ml1XdHo+F8Txiq17dn9TaJmQ9IC0ZJANAYpox4EtJAkLjBiTGHQGMiwXECIoiAhCiWHlhiwGMAiGMAgMJYDGKIDDAgAQEBhCABCAwoAEBAAwIgJtGBCNmcU0U1Kh+GmgzMfQbDuYEJ2xh1O24N7D1GTNjXstiRh6Z9ftHHxeQlLsUZJpGaeqsmuTOF5HTYYqiKtMCmF0IWwX/iQB+c14WcfsSVSTxjbsaA4izgKLBgRryAtqbyMqcFL08Yvme6LFHF/LdzewsLXsBmJPIAmUOLiUyr/9tvvYbRxIfNYfC2U+Y3HpK5poi4OGM99xFaqP0lEky6MWZmMwyv2Jtr5dpBywa6rZQMvE8MI7+lpX8V52Nteqz6HGe2fBC1P3iC1SmQyny/wg9jf7om7S6jflfcz8Sp+ND4keq+aK/BeKCrR94BrazLYGzDQqwOxnTR55gY/iSUxnqDfZV0JJ2Avp9f3IYjOocdRzYqyqdmI8Pa9r/WwiDAXHOHqy5XtrqNQdeoPWNoaeDG4LxNkb+HrHUaIx59FJ/L6THbV3R6XhXEulNj9n/H0N5jMx6RA5oEsC3MaDAljJDwLMYYEtGMBoyGAGMBYAJgIUsmeUGKIDDAgNDFgMMQGMEADgMIQAMQGFAAgIAGBAAa9daYzOwUd/yA5mCWSMpKKyzX4H7KYrGWZwcLQP3mH27j/gh+DzbXsZGU4x9WZZWyl02XzPpvAPZ2hhEy0KeW/xOfFUc9Wc6ny2HISmTk+pnckXsct6bjNk0Pi6c7yMLMTWw4PEk8ZOcONVjyBAswFraeW4037XnXhWdCEcLf8AQr1sacmmgN7aaMNQbNff9o+VMkks79jWq49sLRdMpZ2L+MWKgkABmF/D5c7TLJc0s5KI0LU2qWcJY2C4Ey/wxpLWHvWDEgHxqXFlIG/Q36mZbppywmLVprUc7h4Vj2eDhhh6tNz4vEr3NjcZ1OjdD5zC7Wmem5qrILbqvk+x2OB4sK1QIqEAJmYnrcCwt5ycbFN4RwLtLKmGZPvjHoXsRXVRrKp4gUQg5PY53jHEFYEWFrdBK4ybex1tNpmmsny2vXGGxNwbU63xDo2uVv6rH1UnnPQVTzFNnn+J6T8NqHBdOq9n9ste2/iSnWUh7AXtplZc1iwGxPvDvp4bcxLWc9GXhOO+8pCgmH8Vxdz0BvZR3ta/IG8AZrVmYAaErcJmscpa18t+tv1jEcv7Q0/EDYA9pBk4s6DhGJNWijnU2sT1Km1/W15hmsSPecOud2njN9ej/TYtkyJuwATAlgU5jDAlnjHyi2MkLABgRYBgRAMBABZM8mGsBjBAkGsAGAQGGsBjBAAliGGogAYjA8SBqTYfhAH6k8Pp1sUcuFUFb+Ku9xSXrl51D2HrJYS3ZSrJT/1L9e39ncezfsrRoMKjXrV/96oPh/8AqTamPLXvKZSlLZdAdSgnKTyzv8NQC9zsel+g8xqDNVenjHrucW3Vyk9tkXag0v5a9ZTqYLHMKmTexzfG+JstUYciwqqAj/8AMkgqb6EEW7i/fSqiEcfElvhnRpr25127HMYsNRazA7DcAbDlbf8AvOxCUZLmi8o1xnnoLos2RkSoCrDM6C11IOm+oJynUbadRMk74c2S+MMyTawFgMLmF9dzrffpeYrdUm3g3Sl8PY0qHDkVb63POcicsvJRO+UnjsTX4eNkuWOygXMqbbeFuKGo7y2RY4Xw+rh8zsRcixXkOevVuwlylOrdFGo1FeoxFdv3/pGbxKuxNyfr/mkoTc3l7m2iEYx2OB9pPaykl0pEO3Uar6fN56DvynW0+keMz2KreLRq8NS5pfJfX9DgsfinrNmcnkbeW307fqZ0VJJYRxbY2Xzdlry2afA+PVFqBHIyt4QSOuwbkRylkZZMVlXKzpUqLlq2JR7rlVKQCuCfHmcCwAFzqeXO+kikyMTxUU1Kqx+IvbMxXNly5gl8t7aXtfUwbHg5zHYw1D1J5CRySjFt7HZ8Gwvu6KId7EnzJJP5/hMFksyye+4fp3RRGt9e/uyyTIm7ApoyQtowEtJDwAYCBMZEAwIgGBHAKSZ5IMQGMWBIMQGGIAMWIYaxjCEADEiMMRgUsJQFfEOKpzIhULTv4SbXzOPvdrzVVBOOS7QaSGqnY7d1DGI9t98vz9D63wbhISmrt4hZSKaW+G+o7aK2g+U7WlkdPFvLOTxLjHJN00rDX30++h0aABQQFYKB5W0Y66X0tr/L80m0l1ODCy2yfXORT8WQE5V8uwG3qJhlrF0idWvhclvN7Filiy2/0madds/FLoT5IJ4iZntPhff0DlH2ieNPTUj1F/UCPT2fDnv0ezLqswmn2OUrY56+GRKgzVAxsx+LJbZu9+Z7d5a7Y1Sly9zpU6ZKzmXT+SMLw8AaCcq/UnRdijsizgMfTVamZsopuVdjoLixt3+IDvM8q7MxS35lnYx2y5nk6/BcML2b4VtzGp8hy9ZfRpZWbt4RybdUo7Ldm1hsElMWUWvueZ8zOtVp661iKOfZdObzJnI+3PtZhMECtR81S2lGmQX12LfIPPU20BlNmn5/Yvom09kfDPaD2nr4wkD7On/tre3qTqx89OgElVRVT+Vb+Z0fh33+GTwvJFXh/BixuQddyZOU/M6mm4bGK3Q7G8DKi8ipZNFmgi1sYWJw3KWRmcTU6XGzIqYys2hY/WX86OX+Gm30Fe6J3J9P3kXNE46STZscD4b4g1vrKZzyeh4Zw9Vv4jW51uWwmc9AkLeMmhbGSHgQ5jDAsmMADATBJjIsAwIg3iI5FrLDyQ0GBIJYDDEAGKYmMNYDDUwAMRDDEABrPYSSBvBz9Lihp4kMdj4W7j95fW8GajWPTahWdukvb+j697O+0Ip0ir3bS9MjbW2/VdFP9NtiZerVFYZo4twP8VcraXhPqXlxz1bHRUGgtcKBfYczKFC/UvEFhGHU2aDhEM2vMvLrJ/p2LNA5Tci3QffPnyX8/OSlDTaRcqfPP5I5mnu4jxOXNKPwauy/8n7/AGl7mhRrE9h0mC26U95HYjp4VLCLGLxq0kJaxJFlXmxP6a6ymLx2IRrdk1FFT2c4OKli4uqgDXW9hovlK9PU7Ztvoi/W6p1LlhszX4vwula4sjabaA+gk9dp6uXPRmHS6m3OHujJXAU1YPYMw1Bb7p+ZF2B7795y+dwWIf3/ANGqUpWbSLmO9oaOGT3leqtNeV9SxteyqNWPYAzXpZTk8RMllaR8u9r/APq5WrXpYIGimo96be9buLaUxvtc6g5htOvnC3JUaNz3Z8+o4N6rZmJYkkknUknUk9zvIOR3dPw9I6Hh3BQNTKnM69dEYI26NBVGkg3kvxg9VS4sYgON4nhQXIQ5u42Ha/M+V5rhXJrJwOI63TRlyp5fpuVKXCmJkZZWzFptLG6CnF7M0sJwTrIuSOpVooQ3NrD4YINJW3k2qOAnMSLEiu9+sZIUzSWB4FNGAsxgCYEQYEWCYEGATEQAAlp5RDBAYawGMEBhrIsYaiMAwIDGLEAUEMVjKyqhLG0nFNvYpusjXHMjna2DFXxWIvsbgeRtYm30l6jg5Fl/P2On9ncSUTLUYHJqSdgo116jQ+mkbWx3+EcQi6np7HjCeH6eXuux3+H40lZFqKyU01y5Reo1rXCrYEbWubWtbtI2aiyUeX8sfQwaXgunjJXY+NN7qT6LP8/u/YfSfMb6hL+Et/mpt0nJm+V+Hf0Ou1yrHV98Gnhzta/nJVyb69fIyT9TBxtzjn1uAqDfRfDcjtvf1l9mFSsldLfNsdHgcYtP4WN+o2nKjPkfNF7juplZ1WxV4v7Q0qQNSo9h33Pl1koVzultuyHwo1RzLZHzrjv/AFOe5XDJbTR2F28wuw9fpNsOHRW9jz7FD1HM8Vx+/Y4nEVa+JfPWdnJ5sST5eXYadprWIrEVhGvT8OnY+azc1uH8G2uJW5Hfp0kYI6HDYRUG0qbbNaWB5PKIlgq4rGpT0Ju3yrYn15AecshVKXQw6viVGmXjeX5Lr9/sYuP4gz/Gcq2+BeY/5HmO5sOs2wpjD1PJ63i12o8K8MfJfyZJ4iDfK1MW+ZiFPYZfE/8ATYDqQZZk5Y/2Y4sWdkexLG4P6fp9Okz3wysnf4Fq1Xb8GXSXT3/v6HTipMmD2XKA1SGCXKLd40PAio0kiSQkmMYBMCIJgIEwEDAiwTGQYMRAWJaeUGCAwxAAxEMMRDDWADAIDGLAZIMBHN1cT75jUfSmp8K9bHQkc/3mqMcI4N9rsm2ywlc75SBtrbnt2v2veSKS1hcTlYONRzHUcxGShOUJKUeqOgwOOCMHVVIt4QR4R00HTpHZQrYY6ex9A004azSxlDw+aXb0+h04rW/1KoeoTbKhVgljrmYaA7+ETK9NGuOIrBliub/XDlj5tYz7L+WWV48q6LZm/wDEfvOe2obrqReglLd7Io4zHpc1arhSx32ubbBRvoOUqULbpYW4pyq0kN2kvU5zi/t0qApRUltszcu9uR8/pNdfD4webX+iONbxJ2bUx/VnFYvGVsQ2aozE9/0HKanJJYisIVOinbLmsbbLeA4USdpXKXmd7TcPjHfB0eC4YqjUSpyOnGCiaSraVkhWLxaUwCx32A1J8hJxg5PCMuq1lWmjzWMyK+MqVNB4F7HxHzYben1myvTxj13PLazjd13hr8K+f7mdxSoaVMsm9xr0ubE+ffvL+nQ4rbbyznPtK7opYDO4UXNluSBdiddL7m5tI5AUuGIqGl4SwLL8SgXFxcMxA/8AUEDAzGm+hBKm/hII7jMNPUQHF4eUdxgMb7xAwPnMU4crPonDNWtXp1Putn7/ANlktKzo4ALSQ8CiYAATGIEwECYCIMCLBMCLAiIEWgQFqZceUDWAxiwAMQGGIhjBEAYgMMQGKxdTKpjRCfQ5RK/2aZtlfK1uVgRf8jNeTzzWHgvcWoUqZBp1EqBgfgN8wI+Ega37HnAR7hxYhr66gX6kKoY38wYAbPDqv3D5r+olldnJk7XBdf8Ahr+WT8Mtn6Psy174/DffQAc+1uczznK1nu7rqNOue2SXuTxDin8OtjZXuQVb41sBYmnyvfS/TWRWjjnNj/Q8hrv8j+JmOmj+r+n1OSx/GKlU/ET6/wCW9JbzKKxBYRwG7Lpc1j5mPwXDiZllLJ6jScOSS2Oh4fwi2plTmduuiMEbFOiF2ErLiatUKMzEADmdBBJt4RCdkK4uUnhIysXxJ2NqXhX5yPEf5QdvM/Sa69P3keY1/HX+TT//AF9Crl1uSSeZJuT6maVFJYR5222dkuabyyc0kVi6yhgVOoIsR5xAchi6ZpsyHXX69GHmP16SIxFBQzAG9iQLLa/kLwAJHy5gCbEEEAkX87b+UBGx7M1yua/wAi/a9/y0PqZXZDmidjg2u/DahKT8Mtn/AA/vzOmMyH0FAtGMEmAMAwIgmIRBgRBjIkGIiwDAgDAgLlx5QYsBhiIYwRgGpiYw1MEMYIgCEBlXiI8JkkQmcth7Co1Ntn/PlL4vKOJfHEi3R4KoNyxt20/GTwUFyrXRPAF2HLYdvOAB4XFBmsDY6Ecx21GxgBZ4txaphwGpooNQkGoBd1Ol0UnRBpmBGuvaT5+VYRKyU7Z81km36nMhXrMSxJub66yiUjRXQ2bfD+EdpU5HQroSR1ODwoVR5D8plk3k9lT/AK4v0RciJtpLLM3EcTG1MZj833B/+vTTvNFenlLd7HD1vHKqcxq8cvl9+xQqAscznMeXQfyjl/mpmyMIx2R5XU6y7UyzY8+S7L2IkjMegBAgBBgBl8WwWcXVQWGljpcHlfr/AHkWhp4fmYjYQ3sabqT2zCR3J+B+nzL2E4LzqHT5R+pksFZr0qaqMoAA6CMC3hqmmU7j8RyP6ekx2w5ZH0Dgmu/E6fEn4o7P+GNJlZ2wTEIEwEQYyIJiIgmBFkGBFgGBBgmBEUsuPJjBAYaxDGAxYGGIYGMWABwAIGAyKyXBghSWUcdxekVa45GXwZytVDubODrZ1DDnLUYB9TDA3qkhU8S3OxIYjUnQEEHTvACpWwhDC1hry3ve9rbDr6HpACzxSlnVRyzi/wBCB+J/LrIy6F1CTmky5geGgcpmbO3CpI1aaAbRF2AHx6rovjb5RsP5m5eW/aJUykzoT4vRp6YpvmljovvYqV2ap8ZuPkGi+vzev0E1wqjA8zrOKX6nZvEfJAy05pNbhzBRUIdQ3wsCRm7hToR3tJOLQlJN4RVKuOat5jKf+4afhIMkR7+3xIw7gZh/43P1AgAVOqrfCQfIxAFAAHgAFoAQYADc3sB6nb+8AIWuDVVV1Oua3Jbc/W0quxg7f+PuxaxcnTD5vbH1L5mM+ggmMRERFgmBEgwIgmBFgmBFgmIgwYEBSy88oMEBhLAY0RDCEAGCIYSwGEDAA4Dwc9x6huZZFmLUQyijwXE2uh8x+svRx2jo8BilQ3amrHqb3GliRyGml7XjyIQqAtcEkDRVJByjUAaAXIGlzyHnGB7EV6YRTnV81MM4W/2bNf7Jifvgb22iYL0LvCOJCpRzndbhupIHLzFpmcHzYO7TqU6ueXbqeqO7fGco+RTr/Uw/IfjL41JdTnXa2dm0dkRTcWstgBoLCw9JYYwgYCNP2f4a2IrpSU2JO/QDUn6CWRXchOWEdR7TGkUFNFNRrutMA+M+7ur4itl1Zrq2UbZeXKWvODPX1z2OEcTOzWLMQwKlJW3UHvbUeRiAWaBHwuw7HxD8dfxgAtmcbqG7qbH/ALW/eAEpVBNrMD3BH47H6wAHEYhUF2PpzMBpZKq+9rfD9mnXmf2lE7kuh29DwS7UYlLwo0sFgVpCw3O55mZpScup7PRaCrSx5YL3ZYiNoJgIgwIsEwIsiBEExEQTAgCYEWDeBASDLzygwGAwxAYaxZGMEMjCBiGGDAAlMBoIQGUuKUrrHFlNkco5BiUe46zTHocS6OJG7hcapAMZSEcbYKCQQihUAULYdWt8THmY8gZeNxTVDb8JFsnGOXhGw1FkwoCbqQx763MqUvFk6sqcaflRew2IWqgbrv5iaDjtYGxgWcDgnrNkpqWbkLi58r7ntvJRWSMpKPU7P2d4U+Gp1azMqMyrSuQxajnKmo7pYFcq39ZdFJdTNZPm6A47imHpGtWFVK1R09zRpqjZKdOyqGYuPiyja25Ig2SjW3t2OJamxXMBp1BBtrbUbjXrMzks4Niqly83YTeMgegB60QC6zhRdiAIAZ5xb1Tlorp8529JXK1ROjo+G36p+FbeZbwfB1U5nOdupmadjkew0PBKdP4peKRo2tKztpJAkwGCYCYJgRZECJBgRBiIgmAmCYEGCYiDBgQEgzQeVGLAYwGJjCBgMYIMAxESCEADEBom8Bg1VuLQQmsnIcXw1ml0GcnVVlWjUtLMmLATVidoDUMmnwjAEm5EqlI6OmoxudZTojLlOx0lR0VHY56kDh6xpn4H1XzmmuWUcXV08ksmmTLTGMp1SCCDYjW40IPURp4EyxUxFSoSzMzHwqWZiTqPCCSdvD+EbnglCrJaNOnTR8xYVQSaehXMpOUNYgi25+usocpSax0N3JXVF5/N2M/EYm5awAViDYAD4RYbedz3k1HBmst5m8dGJAkikPYXOkQGdiOJ65KS5268hIymo9TRRpbb5Ygsk4fhTOc1Zr/8eQ9Jlna30PXaD/HoV4ndu/I1kphdALCVHpIVxgsRWESxgTAJgAMBEGAiICIgRYJiIgmBFkGIiCYyLAMRBgwICRNB5YYDABggMIQGEDEwGCIYawGFAaJEBhiAzO4lgc8kmZ7K+ZGFU4YwMnzGN6dlzA8JN9RE5FtenwdFhcOEErbNsY4LIMRMzeOYL3lO4+JdRJxlhmfUVc8Stw3E+8S5+IaMO81p5OBKOHgsERkQ6dcgFdLHe6g62tcEi4MTWSyNkorl7C2YCMg2Qqk9h+P9oCE4nHpT0Hibko1PrIuSXUnCuU3iKyxKYOrX1qHKvyj9Znnd5HptB/jsp4lfsvI1MNhEQWUAShvJ62jTV0R5a1geTEXgEwGRAATAREBEGBFkGAgTEJgmBAgxEQTATBMCtgmBFgGLJASJpPLBqYDGKYDGLAYQiYBRDDBgMIGA0GIEgoAFAD3ux0gRwMUAREkiYDJBgBN4Ac7i0/h6+YfA+/bvNFUjj62jD5kaV7y85wkVbsVA668uX7wATXqIgu5uenPy7xZwNJt4Eqa1bRR7tOvM/tKJ3JdDuaHgd2o8UvDE0sFw1KetrnmTvM0pOXU9jpOHUaZeBb+ZcMRvQJMBgkwAiAAwEegAJgRPGAgYCZBiIsEwIgmIiQYEQDAgwTAgwYiAhZqPLhiIYxTAYYMQwhEAYgMMQGGDAaJEADvENE3gMJTAA4DJvADwgBMAK+OwoqrlI15QzgnXWrJqL7mPhMYEBSobFdNeYmuE1JHndXpZae1wYIxD1NKK2HNrWilaomjRcLv1L8KwvMu4ThKr4nOdupmWdjkey0PBaNPvLxM0QLSB2cEkwGDeAyLwERACIARARBgIgwERAiCYhEQIkGBFgmIiwTAiwTAgwDEQYMCBXBmk8uGIDGqYDDEBhAwGGDFgYwGIZIgNBiAyRAA4hhCAEwGSIATAD14Aezc+kGTqeJxfqheK4dTZszLrK1Jo9LPSVWy5pxyyUQLoBaM1xhGKxFYCvAkeJgAJMABMAIgB6AiIARAREBMgwEREIgwIsGBEgwECYiLBMCDYJiIMAwK2CYET/9k=",
    discount: 5,
  },
];

const categories = [
  { id: 1, name: "Flagship Phones", icon: "📱" },
  { id: 2, name: "Budget Phones", icon: "💰" },
  { id: 3, name: "Gaming Phones", icon: "🎮" },
  { id: 4, name: "Midrange Phones", icon: "📱" },
];
function Home(){
  // get navigation for navigating
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center ">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover the Latest Mobiles
              </h1>
              <p className="text-xl mb-6">
                Find the perfect smartphone with exclusive deals and offers
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1661634383167-a976a5229340?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxzbWFydHBob25lfGVufDB8fDB8fHww"
                alt="Latest Smartphones"
                className="h-64  object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">
            We Have Everything You Need!! 😀
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Mobiles Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">In the spotlights</h2>
            <Link to="/products" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2  lg:grid-cols-3 gap-6">
            {latestMobiles.map((mobile) => (
              <div
                key={mobile.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl  hover:-translate-y-1 transition"
              >
                <div
                  className="relative"
                  onClick={() => navigate(`/products/${mobile.databaseId}`)}
                >
                  <img
                    src={mobile.image}
                    alt={mobile.name}
                    className="w-full h-48 object-contain p-2"
                    loading="lazy"
                  />
                  {mobile.latest ? <span className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-md font-bold">New</span>:""}

                  {mobile.discount > 0 ? (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {mobile.discount}% Off
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="p-2">
                  <div className="flex  justify-between items-start  m-2 ">
                    <div>
                      <h3 className="font-bold text-lg">{mobile.name}</h3>
                      <p className="text-gray-600 font-semibold">
                        {mobile.brand}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-stretch  md:flex-row md:justify-between mt-5 gap-2 ">
                    <span className="font-semibold text-xl">
                      Price:{" "}
                      {new Intl.NumberFormat("en-IN", {
                        currency: "INR",
                        style: "currency",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(mobile.price)}
                    </span>
                    <span className="font-bold text-xl"></span>
                    <button
                      onClick={() => navigate(`/products/${mobile.databaseId}`)}
                      className="btn bg-blue-600 text-white px-1 md:px-3 md:py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Premium Brands</h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Explore the world's leading mobile brands with exclusive deals and
              latest technology
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Brand Card 1 */}
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=apple")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png"
                  alt="Apple"
                  loading="lazy"
                  className="h-10 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Apple</h3>
              <p className="text-blue-300 text-sm">Latest iPhone models</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 15% OFF
              </div>
            </div>

            {/* Brand Card 2 */}
            <div
              className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=samsung")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="data:image/png;base64,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"
                  alt="Samsung"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Samsung</h3>
              <p className="text-blue-300 text-sm">Galaxy series</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 12% OFF
              </div>
            </div>

            {/* Brand Card 3 */}
            <div
              className="bg-gradient-to-br from-red-800 to-red-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=google")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="data:image/png;base64,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"
                  alt="Google"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Google</h3>
              <p className="text-blue-300 text-sm">Pixel series</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 10% OFF
              </div>
            </div>

            {/* Brand Card 4 */}
            <div
              className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=oneplus")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/50640553e4b0e9530e2dfb13/1595343938815-UAPEFKX5JQM6TM4X3JUV/OnePlus_LU_Red_RGB.png"
                  alt="OnePlus"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">OnePlus</h3>
              <p className="text-blue-300 text-sm">Never Settle</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 8% OFF
              </div>
            </div>

            {/* Brand Card 5 */}
            <div
              className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=xiaomi")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="https://i.pinimg.com/736x/f0/2b/43/f02b43f505b174a67fd5a5c24aef8760.jpg"
                  alt="Xiaomi"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Xiaomi</h3>
              <p className="text-blue-300 text-sm">Innovation for everyone</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 20% OFF
              </div>
            </div>
            {/* Brand Card 5 */}
            <div
              className="bg-gradient-to-br from-sky-300 to-cyan-900 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => navigate("/products?brand=asus")}
            >
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <img
                  src="data:image/png;base64,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"
                  alt="Asus"
                  loading="lazy"
                  className="h-8 object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Asus</h3>
              <p className="text-blue-300 text-sm">In Search of Incredible</p>
              <div className="mt-4 bg-blue-600 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                Up to 18% OFF
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/products")}
              className=" btn bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-110 duration-300 "
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
