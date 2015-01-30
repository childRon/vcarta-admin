package by.vcarta.servlet;

import by.vcarta.cookie.CookieService;

import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Logout servlet. No ability to remove cookie via client-layer.
 *
 * @author: Andrei_Misan
 */
public class LogoutServlet extends HttpServlet {
	private CookieService mCookieService;

	public void init(ServletConfig servletConfig) throws ServletException{
		String maxSize = servletConfig.getInitParameter("maxSize");
		String cookieLiveTime = servletConfig.getInitParameter("cookieLiveTime");
		String cookiePath = servletConfig.getInitParameter("cookiePath");
		String cookieDomain = servletConfig.getInitParameter("cookieDomain");
		String obsoleteCookieDomain = servletConfig.getInitParameter("obsoleteCookieDomain");
		String clearCookiesWithObsoleteDomain = servletConfig.getInitParameter("clearCookiesWithObsoleteDomain");
		mCookieService = new CookieService();
		mCookieService.setClearCookiesWithObsoleteDomain(Boolean.valueOf(clearCookiesWithObsoleteDomain));
		mCookieService.setCookieDomain(cookieDomain);
		mCookieService.setCookieLiveTime(Integer.parseInt(cookieLiveTime));
		mCookieService.setCookiePath(cookiePath);
		mCookieService.setMaxSize(Integer.parseInt(maxSize));
		mCookieService.setObsoleteCookieDomain(obsoleteCookieDomain);
	}

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		if(mCookieService != null){
			mCookieService.deleteCookie(req, resp, "user");
			mCookieService.deleteCookie(req, resp, "token");
		}

		resp.sendRedirect("/");
	}
}
