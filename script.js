const header=document.querySelector('header');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>24));
const menuBtn=document.querySelector('.hamb'), mobile=document.querySelector('.mobile-menu');
menuBtn?.addEventListener('click',()=>mobile.classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*45,300)}ms`;obs.observe(el)});
const filters=document.querySelectorAll('.filter');
if(filters.length){filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.gallery-item').forEach(item=>item.classList.toggle('hidden',f!=='all'&&item.dataset.category!==f))}))}
const form=document.querySelector('#quoteForm');
form?.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}const data=new FormData(form);const subject=encodeURIComponent('Website Quote Enquiry — Bearma Staal');const body=encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\nBudget: ${data.get('budget')||'Not specified'}\nTimeframe: ${data.get('timeframe')||'Not specified'}\n\nProject description:\n${data.get('description')}`);window.location.href=`mailto:Rainier@bearma.co.za?subject=${subject}&body=${body}`;document.querySelector('.success')?.classList.add('show')});
