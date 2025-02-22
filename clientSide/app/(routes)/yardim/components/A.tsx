"use client"

import { CreditCardIcon, Truck } from "lucide-react"
import { CgShoppingBag } from "react-icons/cg"
import { MdPerson, MdQuestionMark } from "react-icons/md"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
const A = () => {
    const popülerSorular = [
     /*    {
        title : "Banka niz nedir?",
        description:"TUBA BUTİK TEKSTİL SANAYİ VE TİCARET LİMİTED ŞİRKETİ.TR34 0006 2001 3200 0006 2992 85.Türk Lirası Hesap Bilgilerimiz'e ödemenizi gönderip whatsapp destek hattımıza dekont paylaşımında bulunabilirsiniz."
        }, */
        {
        title : "Siparişim aynı gün teslim olur mu?",
        description:"Tüm Türkiye'ye siparişleriniz aynı gün kargoya teslim edilir ve adresinize 1-3 iş günü arasında teslim edilmektedir,Bu şartlarda hala teslim edilmeyen bir siparişiniz varsa İnstagram Hesabımdan bilgi alabilirsiniz."
        },
        {
        title : "Siparişim ne zaman kargoya verilir?",
        description:"Siparişlerinizdeki tüm ürünler hızlı kargo için uygunluk sağlıyorsa, siparişlerinizi aynı gün 16:00’ya kadar, 16:00’dan sonra verilen siparişler ertesi gün ilgili kargo firmasına teslim etmek üzere hazırlıyoruz.Siparişinizde tedarik edilmesi gereken ürün/ürünler olması durumunda kargoya verilme sürelerinde değişkenlik olabilmektedir.Ürünlerin tahmini kargoya teslim tarihlerini ürün detay sayfasında beden seçimi yaptıktan sonra görebilirsiniz."
        },
        {
        title : "Siparişim ne zaman gelir?",
        description:"16:00’ya kadar alınan siparişler aynı gün kargoya verilmektedir.Daha Fazla Bilgi İçin İnstagramdan İletişime Geçiniz."
        },
        {
        title : "Siparişimi nasıl iptal edebilirim?",
        description:"Yanlış ürün sipariş ettiyseniz veya fikrinizi değiştirdiyseniz ürünlerinizin kargo hazırlıkları başlamadan önce aşağıdaki şekilde kolayca iptal edebilirsiniz. WhatsApp destek hattımız ile iletişime geçerek sipariş numarasıyla birlikte “Siparişimi iptal etmek istiyorum” yazmanız gerekmektedir."
        },
     
        {
        title : "Üyelik bilgilerimi nasıl güncelleyebilirim?",
        description:"Üyelik bilgilerinizi güncellemek için “Hesabım” sayfasını ziyaret edebilirsiniz."
        },
     
        {
        title : "Ödeme seçenekleriniz nelerdir?",
        description:"Kredi Kartı ödeme seçeneğimiz mevcuttur."
        },
     




]

  return (
    <div className=" w-full h-fit flex flex-col justify-center items-center p-[10px] gap-[30px]">
<h2 className=" w-fit h-fit text-[16px] ">Sıkça Sorulan Sorular</h2>

 <Tabs defaultValue="account"  >
    <div className=" w-full h-fit flex flex-col justify-start items-start">


  <TabsList className=" w-full h-fit flex flex-row gap-[10px] justify-center items-center"   >
    <TabsTrigger value="popülersorular" >
    <div className=" flex flex-col w-fit h-[90px] items-center justify-center border border-green-300">
    <MdQuestionMark/>
    <h2>Popüler Sorular</h2>
     </div>
    </TabsTrigger>
    <TabsTrigger value="alısveris"> 
         <div className=" flex flex-col w-fit h-[90px] items-center justify-center border border-green-300">
    <CgShoppingBag/>
    <h2>Alışveriş Ve Kampanyalar</h2>
     </div></TabsTrigger>
    <TabsTrigger value="Ödeme"> 
     
    <div className=" flex flex-col w-fit h-[90px] items-center justify-center border border-green-300">
        <CreditCardIcon/>
        <h2>Ödeme</h2>

    </div>
     </TabsTrigger>


     <TabsTrigger value="Kargo">

     <div  className=" flex flex-col w-fit  h-[90px] items-center justify-center border border-green-300">
        <Truck/>
        <h2>Kargo Ve Teslimat</h2>
    </div>
    </TabsTrigger>


    <TabsTrigger value="Üyelik">

    <div  className=" flex flex-col w-fit  h-[90px] items-center justify-center border border-green-300">
        <MdPerson/>
        <h2>Üyelik Bilgileri</h2>
    </div>
    </TabsTrigger>

    <TabsTrigger value="Üyelikk">

    <div  className=" flex flex-col w-fit  h-[90px] items-center justify-center border border-green-300">
        <MdPerson/>
        <h2>Üyelik Bilgileri</h2>
    </div>
    </TabsTrigger>


  </TabsList>

   {/* 18 */} 
  <TabsContent className=" w-full h-fit"  value="popülersorular">
  <Accordion  className=" w-full h-fit" type="single" collapsible>
    {popülerSorular.map((item,index) => (


  <AccordionItem   key={index}    className=" w-full h-fit" value={index.toString()}>
    <AccordionTrigger>{item.title}</AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
        {item.description}
    </AccordionContent>
  </AccordionItem>
    ))}
</Accordion>


  </TabsContent>
  <TabsContent value="alısveris">
  <Accordion  className=" w-full h-fit" type="single" collapsible>
  <AccordionItem      className=" w-full h-fit" value={"item-1"}>
    <AccordionTrigger  className=" w-full h-fit"> <h2>Nasıl sipariş verebilirim?  
        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Satın almak istediğiniz ürünleri, uygun beden seçerek Sepete Ekle butonuna tıklayın.Ürünleri sepetinize ekledikten sonra, ekranın sağ üst köşesinde yer alan Sepetim simgesine tıklayın.
Devam etmek için Sipariş Tamamla butonuna tıklayın.
Kargo adresi alanını doğru bir şekilde doldurun.
Tercih ettiğiniz ödeme yöntemini seçin.
Gerekli bilgileri doldurarak Sipariş Tamamla butonuna tıklayın.
</h2>

    </AccordionContent>
  </AccordionItem>
  <AccordionItem      className=" w-full h-fit" value={"item-2"}>
    <AccordionTrigger  className=" w-full h-fit">  <h2>Üye olmadan sipariş verebilir miyim?

        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Malesef Şuan İçin Öyle Bir Seçeneğimiz Yoktur.
</h2>

    </AccordionContent>
  </AccordionItem>
</Accordion>


  </TabsContent>
  <TabsContent value="Ödeme">
  <Accordion  className=" w-full h-fit" type="single" collapsible>
  <AccordionItem      className=" w-full h-fit" value={"item-1"}>
    <AccordionTrigger  className=" w-full h-fit"> <h2>Kapıda ödeme seçeneğiniz var mı?

        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Malesef Kapıda Ödeme Seçeneğimiz Yoktur
</h2>

    </AccordionContent>
  </AccordionItem>
  <AccordionItem      className=" w-full h-fit" value={"item-2"}>
    <AccordionTrigger  className=" w-full h-fit">  <h2>Kredi kartımı kaydediyor musunuz?


        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Yapacağınız ödemelerde kredi kartı bilgileriniz hiçbir şekilde bizimle paylaşılmamaktadır. Ayrıca dttasarim.com olarak kart saklama, kart kaydetme gibi hizmetler sunmuyoruz. Kısacası kart bilgileriniz kaydedilmiyor.Ödelemeleriniz tamamen iyzico sitesine yönlendirmeyle yapılmaktadır.
</h2>

    </AccordionContent>
  </AccordionItem>
  <AccordionItem      className=" w-full h-fit" value={"item-3"}>
    <AccordionTrigger  className=" w-full h-fit">  <h2>Havale ile ödeme yapabilir miyim?



        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Evet, Siparişlerinizin ödemesini Havale/Eft ile gerçekleştirebilirsiniz. Bunun İçin İnstagramdan Ayrıca İletişime Geçmeniz Gerekir.  

</h2>

    </AccordionContent>
  </AccordionItem>
</Accordion>

  </TabsContent>
  <TabsContent value="Kargo">

  <TabsContent value="Kargo">
  <Accordion className=" w-full h-fit" type="single">
  <AccordionItem      className=" w-full h-fit" value={"item-1"}>
    <AccordionTrigger  className=" w-full h-fit"> <h2>Siparişim ne zaman kargoya verilir?


        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Siparişlerinizdeki tüm ürünler hızlı kargo için uygunluk sağlıyorsa, siparişlerinizi aynı gün 16:00’ya kadar, 16:00’dan sonra verilen siparişler ertesi gün ilgili kargo firmasına teslim etmek üzere hazırlıyoruz.

Siparişinizde tedarik edilmesi gereken ürün/ürünler olması durumunda kargoya verilme sürelerinde değişkenlik olabilmektedir. 
</h2>

    </AccordionContent>
  </AccordionItem>
  <AccordionItem      className=" w-full h-fit" value={"item-2"}>
    <AccordionTrigger  className=" w-full h-fit">  <h2>Siparişim ne zaman teslim edilir?



        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Satın aldığınız ürünlerin tahmini teslim tarihlerine göre en hızlı şekilde size ulaşacak şekilde gönderim sağlanır.

Siparişiniz kargoya verildiğinde tarafımızdan takip kodunuz SMS ile bilgilendirme sağlanır.

Siparişiniz dağıtıma çıktığında kargo firmasından tarafınıza SMS ile bilgilendirme sağlanır.
</h2>

    </AccordionContent>
  </AccordionItem>
  <AccordionItem      className=" w-full h-fit" value={"item-3"}>
    <AccordionTrigger  className=" w-full h-fit">  <h2>Kargomu şubeden teslim alabilir miyim?




        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Kargo takip numaranız ile birlikte, kargo firması ile iletişime geçerek kargonuz şubeden teslim almak istediğinizi belirtebilirsiniz.
  

</h2>

    </AccordionContent>
  </AccordionItem>
  </Accordion>



  </TabsContent>
  </TabsContent>
  <TabsContent value="Üyelik">
    <Accordion className=" w-full h-fit" type="single">

  <AccordionItem      className=" w-full h-fit" value={"item-1"}>
    <AccordionTrigger  className=" w-full h-fit"> <h2>Üyelik bilgilerimi nasıl güncelleyebilirim?


        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Üyelik bilgilerinizi güncellemek için “Hesabım” sayfasını ziyaret edebilirsiniz.

</h2>

    </AccordionContent>
  </AccordionItem>
  </Accordion>


  </TabsContent>
  <TabsContent value="Üyelikk">
  <Accordion className=" w-full h-fit" type="single" >
  
  <AccordionItem      className=" w-full h-fit" value={"item-2"}>
    <AccordionTrigger  className=" w-full h-fit"> <h2>Üye olmadan sipariş verebilir miyim?



        </h2>   </AccordionTrigger>
    <AccordionContent className=" w-full h-fit">
<h2>Malesef Böyle Bir Seçeneğimiz Bulunmamaktadır

</h2>

    </AccordionContent>
  </AccordionItem>
  </Accordion>
  </TabsContent>

  </div>

</Tabs>


</div>

 

  )
}

export default A