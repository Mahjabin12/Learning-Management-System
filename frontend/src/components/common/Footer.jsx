function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Byway</h2>
          <p className="text-sm text-slate-400 mt-4 leading-6">
            A modern learning management platform for online courses, student
            progress tracking, and admin control.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Platform</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Courses</li>
            <li>Learning</li>
            <li>Student Dashboard</li>
            <li>Certificates</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Help Center</li>
            <li>Contact</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-sm text-slate-400 leading-6">
            Dhaka, Bangladesh <br />
            support@byway.com <br />
            +880 1234 567890
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;